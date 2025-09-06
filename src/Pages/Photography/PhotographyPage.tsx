import { useCallback, useEffect, useState } from "react";
import CustomNavbar from "../../Components/NavBar/Navbar";
import {
  Button,
  Container,
  Row,
  Modal,
  Spinner
} from "react-bootstrap";
import "./PhotographyPage.css";
import CanvasImage from "../../Components/CanvasImage/Image";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const PhotographyPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [cursor, setCursor] = useState<string | null | undefined>();
  const [loading, setLoading] = useState(false);

  // New state for modal
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);
  const [modalLoading, setModalLoading] = useState(true);

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
          }
        );

        if (!response.ok) {
          console.error(
            `Fetch failed: ${response.status} ${response.statusText}`
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
    [WORKER]
  );

  useEffect(() => {
    fetchImages(undefined);
  }, [fetchImages]);

  const handleImageClick = (image: any) => {
    const json = JSON.parse(JSON.stringify(image));
    setModalLoading(true);
    setSelectedImage({
      url: `${WORKER}${json.url}`,
      alt: json.key ?? "Image",
    });
  };

  const handleModalClose = () => {
    setModalLoading(true);
    setSelectedImage(null);
  };

  const imageGrid = () => {
    return images.map((image, index) => {
      const json = JSON.parse(JSON.stringify(image));
      return (
        <CanvasImage
          key={json.key ?? index}
          src={`${WORKER}${json.url}`}
          alt={json.key}
          width={json.width}
          height={json.height}
          onClick={() => handleImageClick(image)}
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
    <div>
      <CustomNavbar />
      <ScrollToTop />
      <Container fluid>
        <h1 className="section-title">
          A little collection of my photography :)
        </h1>
        <div className="canvas">{imageGrid()}</div>
        <Row className="m-0 justify-content-center">
          {cursor && (
            <Button
              variant="outline-dark"
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
        show={!!selectedImage}
        onHide={handleModalClose}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          {selectedImage ? (
            <>
              {modalLoading && (
                <Spinner animation="border" role="status" className="me-3" />
              )}
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                onLoad={() => setModalLoading(false)}
                style={{
                  maxWidth: "100%",
                  maxHeight: "85vh",
                  display: modalLoading ? "none" : "block",
                }}
              />
            </>
          ) : (
            <p>No image selected.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotographyPage;
