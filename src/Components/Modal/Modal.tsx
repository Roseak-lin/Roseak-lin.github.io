import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./Modal.css";
import { ModalContext, useModal } from "./ModalContext";
import type { ImageExifData } from "../../types/ImageExifData";

import { Button } from "react-bootstrap";
import { useTheme } from "../Theme/ThemeContext";

interface ModalProps {
  children?: React.ReactNode;
  show: boolean;
  showNextImage: () => void;
  showPrevImage: () => void;
  setShowModal: (show: boolean) => void;
}

function Modal({
  children,
  show,
  setShowModal,
  showNextImage,
  showPrevImage,
}: ModalProps) {
  return (
    <ModalContext.Provider
      value={{
        onClose: () => setShowModal(false),
        visible: show,
        selectNextImage: showNextImage,
        selectPrevImage: showPrevImage,
      }}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            className={`image-modal-backdrop`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

function ModalBox({ children }: { children: React.ReactNode }) {
  const modalRef = useRef(null);
  const modalContext = useModal();
  const { theme } = useTheme();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        modalContext.onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        modalContext?.selectPrevImage();
      } else if (event.key === "ArrowRight") {
        modalContext?.selectNextImage();
      }
    };

    document.addEventListener("keydown", handleArrowKeys);

    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, [modalContext.selectNextImage, modalContext.selectPrevImage]);

  return (
    <div ref={modalRef} className="image-modal-box">
      <div className="image-modal-header">
        <h3
          className="image-modal-close-btn"
          onClick={() => modalContext.onClose()}
        >
          &times;
        </h3>
        <Button
          variant={theme}
          className="image-modal-prev"
          onClick={modalContext.selectPrevImage}
          aria-label="Previous Image"
        >
          <svg
            viewBox="-19.04 0 75.803 75.803"
            xmlns="http://www.w3.org/2000/svg"
            height={20}
            width={20}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Group_64" transform="translate(-624.082 -383.588)">
                {" "}
                <path
                  id="Path_56"
                  d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z"
                  fill="#0040b8"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
        </Button>
        <Button
          variant={theme}
          className="image-modal-next"
          onClick={modalContext.selectNextImage}
          aria-label="Next Image"
        >
          <svg
            viewBox="-19.04 0 75.804 75.804"
            xmlns="http://www.w3.org/2000/svg"
            height={20}
            width={20}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Group_65" transform="translate(-831.568 -384.448)">
                {" "}
                <path
                  id="Path_57"
                  d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                  fill="#0040b8"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
        </Button>
      </div>
      {children}
    </div>
  );
}

function ModalFooter({ exifData }: { exifData: ImageExifData }) {
  return (
    <div className="image-modal-footer">
      <div>{exifData.camera}</div>
      <div>{exifData.focalLength}mm</div>
      <div>ISO {exifData.iso}</div>
      <div>f/{exifData.aperture}</div>
      <div>{exifData.shutter}</div>
    </div>
  );
}

(Modal as any).Box = ModalBox;
(Modal as any).Footer = ModalFooter;

export default Modal as typeof Modal & {
  Footer: typeof ModalFooter;
  Box: typeof ModalBox;
};
