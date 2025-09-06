import { useCallback, useEffect, useState } from "react";
import CustomNavbar from "../../Components/NavBar/Navbar";
import { Button, Container, Row } from "react-bootstrap";
import "./PhotographyPage.css";
import CanvasImage from "../../Components/CanvasImage/Image";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const PhotographyPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [cursor, setCursor] = useState<string | null | undefined>();
  const [loading, setLoading] = useState(false);

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
  }, []);

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
    </div>
  );
};

export default PhotographyPage;
