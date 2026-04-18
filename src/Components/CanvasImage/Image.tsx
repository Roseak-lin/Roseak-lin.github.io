import { memo, useState } from "react";
import "./CanvasImage.css";

type ImageProps = {
  src: string;
  alt: string;
  onClick?: () => void;
};

const CanvasImage = memo(({ src, alt, onClick }: ImageProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <div
      className="canvas-image-wrapper"
      onClick={onClick}
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
});
export default CanvasImage;
