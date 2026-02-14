import { useCallback, useEffect, useState } from "react";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import "./PhotographyPage.css";
import CanvasImage from "../../Components/CanvasImage/Image";
import Modal from "../../Components/Modal/Modal";
import { useTheme } from "../../Components/Theme/ThemeContext";

type ImageData = {
  key: string;
  url: string;
  width: number;
  height: number;
};

const PhotographyPage = () => {
  const {theme} = useTheme()
  const [images, setImages] = useState<ImageData[]>([]);
  const [cursor, setCursor] = useState<string | null | undefined>();
  const [loading, setLoading] = useState(false);

  // New state for modal
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
    index: number;
  } | null>(null);
  const [modalLoading, setModalLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const WORKER =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://127.0.0.1:8787"
      : "https://personal-website-worker.roseak-lin.workers.dev";

  const fetchImages = useCallback(
    async (cursor: string | null | undefined) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${WORKER}/getItems${cursor ? `?cursor=${cursor}` : ""}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          console.error(
            `Fetch failed: ${response.status} ${response.statusText}`,
          );
          setImages([]);
          return;
        }

        const data = await response.json();

        if (!data.images || !Array.isArray(data.images)) {
          console.error("Unexpected response format:", data);
          setImages([]);
          return;
        }
        setCursor(data.cursor);
        setImages((currImages) => [...currImages, ...data.images]);
      } catch (err) {
        console.error("Network or server error:", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    },
    [WORKER],
  );

  const selectNextImage = () => {
    if (selectedImage) {
      const newIndex = (selectedImage.index + 1) % images.length;
      const newImageData: ImageData = images[newIndex];
      setSelectedImage({
        url: newImageData.url,
        alt: newImageData.key,
        index: newIndex,
      });
    }
  };

  const selectPrevImage = () => {
    if (selectedImage) {
      const newIndex =
        selectedImage.index - 1 == -1
          ? images.length - 1
          : selectedImage.index - 1;
      const newImageData: ImageData = images[newIndex];
      setSelectedImage({
        url: newImageData.url,
        alt: newImageData.key,
        index: newIndex,
      });
    }
  };

  useEffect(() => {
    fetchImages(undefined);
  }, [fetchImages]);

  const handleImageClick = (image: ImageData, index: number) => {
    const imageData = image;
    setModalLoading(true);
    setShowModal(true);
    setSelectedImage({
      url: `${imageData.url}`,
      alt: imageData.key ?? "Image",
      index: index,
    });
  };

  const imageGrid = () => {
    return images.map((image: ImageData, index) => {
      const imageData = image;
      return (
        <CanvasImage
          key={imageData.key ?? index}
          src={`${WORKER}${imageData.url}`}
          alt={imageData.key}
          width={imageData.width}
          height={imageData.height}
          onClick={() => handleImageClick(image, index)}
        />
      );
    });
  };

  const loadNextImagePage = async () => {
    if (cursor) {
      await fetchImages(cursor);
    }
  };

  return (
    <div className="app">
      <Container fluid>
        <h1 className="section-title">
          A little collection of my photography :)
        </h1>
        <div className="canvas">{imageGrid()}</div>
        <Row className="m-0 justify-content-center">
          {loading && (
            <Spinner className="my-2" animation="grow" role="status" />
          )}
        </Row>
        <Row className="m-0 justify-content-center">
          {cursor && (
            <Button
              variant={`outline-${theme == "dark" ? "light" : "dark"}`}
              className="w-75 m-2"
              onClick={loadNextImagePage}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          )}
        </Row>
      </Container>
      <Modal
        show={showModal}
        setShowModal={setShowModal}
      >
        <Modal.Box>
          <Modal.Header>{selectedImage?.alt}</Modal.Header>
          {selectedImage && (
            <>
              {modalLoading && (
                <Spinner animation="border" role="status" className="me-3" />
              )}
              <img
                src={`${WORKER}${selectedImage.url}`}
                alt={selectedImage.alt}
                onLoad={() => setModalLoading(false)}
                style={{
                  display: modalLoading ? "none" : "block",
                }}
              />
            </>
          )}
          <Button variant={theme} className="image-modal-prev" onClick={selectPrevImage}>
            &lt;
          </Button>
          <Button variant={theme} className="image-modal-next" onClick={selectNextImage}>
            &gt;
          </Button>
        </Modal.Box>
      </Modal>
    </div>
  );
};

export default PhotographyPage;
