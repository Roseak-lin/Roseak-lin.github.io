import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import "./PhotographyPage.css";
import CanvasImage from "../../Components/CanvasImage/Image";
import Modal from "../../Components/Modal/Modal";
import { useTheme } from "../../Components/Theme/ThemeContext";
import type { ImageExifData } from "../../types/ImageExifData";

type ImageData = {
  key: string;
  imageId: string;
  exifData?: ImageExifData;
};

const WORKER =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8787"
    : "https://personal-website-worker.roseak-lin.workers.dev";

const fetchJson = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  });

// Kick off the first request as soon as the module loads
const initialFetchPromise = fetchJson(`${WORKER}/images`);

const convertExifData = (exifDataString: string | undefined): ImageExifData => {
  if (!exifDataString) {
    return { width: 1, height: 1 };
  } else {
    try {
      return JSON.parse(exifDataString);
    } catch (err) {
      console.error("Failed to parse EXIF data:", err);
      return { width: 1, height: 1 };
    }
  }
};

const processImages = (rawImages: any[]): ImageData[] =>
  rawImages.map((image: any) => ({
    ...image,
    exifData: convertExifData(image.exifData),
  }));

// Keep these breakpoints in sync with the CSS
const getColumnCount = () => {
  if (window.matchMedia("(max-width: 480px)").matches) return 1;
  if (window.matchMedia("(max-width: 1068px)").matches) return 2;
  return 4;
};

const useColumnCount = () => {
  const [count, setCount] = useState(getColumnCount);

  useEffect(() => {
    const onResize = () => setCount(getColumnCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
};

// width / height ratios so the skeleton tiles look like a real photo mix
const SKELETON_RATIOS = [1.25, 0.8, 1, 1.5, 0.75, 1.1, 0.9, 1.3];

const PhotographyPage = () => {
  const { theme } = useTheme();
  const columnCount = useColumnCount();
  const [images, setImages] = useState<ImageData[]>([]);
  const [cursor, setCursor] = useState<string | null | undefined>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(false);

  // New state for modal
  const [selectedImage, setSelectedImage] = useState<{
    imageId: string;
    alt: string;
    exifData?: ImageExifData;
    index: number;
  } | null>(null);
  const [modalLoading, setModalLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadFirstPage = useCallback((request: Promise<any>) => {
    setInitialLoading(true);
    setError(false);
    request
      .then((data) => {
        setImages(processImages(data.images));
        setCursor(data.cursor);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setInitialLoading(false));
  }, []);

  const fetchMoreImages = useCallback(async (nextCursor: string) => {
    try {
      setLoading(true);
      const data = await fetchJson(`${WORKER}/images?cursor=${nextCursor}`);
      setCursor(data.cursor);
      setImages((curr) => [...curr, ...processImages(data.images)]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectNextImage = useCallback(() => {
    if (selectedImage) {
      const newIndex = (selectedImage.index + 1) % images.length;
      const newImageData: ImageData = images[newIndex];
      setSelectedImage({
        imageId: newImageData.imageId,
        alt: newImageData.key,
        exifData: newImageData.exifData,
        index: newIndex,
      });
    }
  }, [selectedImage, images]);

  const selectPrevImage = useCallback(() => {
    if (selectedImage) {
      const newIndex =
        selectedImage.index - 1 == -1
          ? images.length - 1
          : selectedImage.index - 1;
      const newImageData: ImageData = images[newIndex];
      setSelectedImage({
        imageId: newImageData.imageId,
        alt: newImageData.key,
        exifData: newImageData.exifData,
        index: newIndex,
      });
    }
  }, [images, selectedImage]);

  useEffect(() => {
    loadFirstPage(initialFetchPromise);
  }, [loadFirstPage]);

  const retryFirstPage = () => loadFirstPage(fetchJson(`${WORKER}/images`));

  const handleImageClick = (image: ImageData, index: number) => {
    const imageData = image;
    setModalLoading(true);
    setShowModal(true);
    setSelectedImage({
      imageId: `${imageData.imageId}`,
      alt: imageData.key ?? "Image",
      exifData: imageData.exifData,
      index: index,
    });
  };

  // Deal images out round-robin so the order reads left to right and
  // new images only append to the bottom of each column.
  const buildColumns = (items: ReactNode[]) => {
    const columns: ReactNode[][] = Array.from(
      { length: columnCount },
      () => []
    );
    items.forEach((item, index) => columns[index % columnCount].push(item));

    return columns.map((column, i) => (
      <div className="canvas-column" key={i}>
        {column}
      </div>
    ));
  };

  const skeletonGrid = () =>
    buildColumns(
      Array.from({ length: columnCount * 3 }, (_, i) => (
        <div
          key={i}
          className="canvas-skeleton"
          style={{ aspectRatio: SKELETON_RATIOS[i % SKELETON_RATIOS.length] }}
          aria-hidden="true"
        />
      ))
    );

  const imageGrid = () =>
    buildColumns(
      images.map((image: ImageData, index) => (
        <CanvasImage
          key={image.key ?? index}
          src={`${WORKER}/images/${image.imageId}`}
          alt={image.key}
          onClick={() => handleImageClick(image, index)}
        />
      ))
    );

  const loadNextImagePage = () => {
    if (cursor) fetchMoreImages(cursor);
  };

  const reachedEnd = !cursor && images.length > 0 && !initialLoading;

  return (
    <div className="app photography-page">
      <Container fluid>
        <header className="photography-page__header">
          <h1 className="section-title">Photography</h1>
          <span className="photography-page__eyebrow">
            A little collection of my photography :)
          </span>
        </header>

        {error ? (
          <div className="photography-page__status" role="alert">
            <p>Couldn't load the photos right now.</p>
            <Button
              variant={`outline-${theme == "dark" ? "light" : "dark"}`}
              className="photography-page__load-more"
              onClick={retryFirstPage}
            >
              Try again
            </Button>
          </div>
        ) : (
          <div className="canvas" aria-busy={initialLoading}>
            {initialLoading ? skeletonGrid() : imageGrid()}
          </div>
        )}

        <div className="photography-page__actions">
          {cursor && (
            <Button
              variant={`outline-${theme == "dark" ? "light" : "dark"}`}
              className="photography-page__load-more"
              onClick={loadNextImagePage}
              disabled={loading}
              aria-label="Load more Images"
            >
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              )}
              {loading ? "Loading..." : "Load More"}
            </Button>
          )}
          {reachedEnd && (
            <p className="photography-page__end">
              That's everything for now
            </p>
          )}
        </div>
      </Container>

      <Modal
        show={showModal}
        setShowModal={setShowModal}
        showNextImage={selectNextImage}
        showPrevImage={selectPrevImage}
      >
        <Modal.Box>
          {selectedImage && (
            <>
              {modalLoading && (
                <Spinner animation="border" role="status" className="me-3" />
              )}
              <img
                src={`${WORKER}/images/${selectedImage.imageId}`}
                alt={selectedImage.alt}
                onLoad={() => setModalLoading(false)}
                style={{
                  display: modalLoading ? "none" : "block",
                }}
              />
            </>
          )}
          <Modal.Footer
            exifData={selectedImage?.exifData ?? { width: 1, height: 1 }}
          />
        </Modal.Box>
      </Modal>
    </div>
  );
};

export default PhotographyPage;