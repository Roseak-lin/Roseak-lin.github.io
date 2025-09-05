import { useEffect, useState } from "react";
import CustomNavbar from "../../Components/NavBar/Navbar";
import { Container } from "react-bootstrap";
import "./PhotographyPage.css";
import CanvasImage from "../../Components/CanvasImage/Image";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const PhotographyPage = () => {
  const [images, setImages] = useState<string[]>([]);

const WORKER =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8787"
    : "https://personal-website-worker.roseak-lin.workers.dev";
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${WORKER}/getItems`, {
          method: "GET",
        });

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
        setImages(data.images);
      } catch (err) {
        console.error("Network or server error:", err);
        setImages([]);
      }
    };

    fetchImages();
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

  return (
    <div>
      <CustomNavbar />
      <ScrollToTop />
      <Container fluid>
        <h1 className="section-title">
          A little collection of my photography :)
        </h1>
        <div className="canvas">{imageGrid()}</div>
      </Container>
    </div>
  );
};

export default PhotographyPage;
