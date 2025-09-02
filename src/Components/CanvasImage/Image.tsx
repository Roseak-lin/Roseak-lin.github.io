import { useState } from "react";
import "./CanvasImage.css";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const CanvasImage = ({ src, alt, width, height }: ImageProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <div
      className="canvas-image-wrapper"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <img
        className={`canvas-image ${loaded ? "loaded" : ""}`}
        src={src}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
        }}
        loading="lazy"
      />
    </div>
  );
};
export default CanvasImage;
