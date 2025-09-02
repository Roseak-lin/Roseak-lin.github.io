import { useEffect, useState } from "react";
import CustomNavbar from "../../Components/NavBar/Navbar";
import { Container } from "react-bootstrap";
import "./PhotographyPage.css";
import CanvasImage from "../../Components/CanvasImage/Image";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const PhotographyPage = () => {
  const [images, setImages] = useState<string[]>([]);

  const WORKER = "https://personal-website-worker.roseak-lin.workers.dev";
  // const WORKER = "http://127.0.0.1:8787";
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`${WORKER}/getItems`);
      const data = await response.json();
      setImages(data.images);
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
        <h1 className="section-title">A little collection of my photography :)</h1>
        <div className="canvas">{imageGrid()}</div>
      </Container>
    </div>
  );
};

export default PhotographyPage;
