import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./Modal.css";
import { ModalContext, useModal } from "./ModalContext";
import type { ImageExifData } from "../../types/ImageExifData";

interface ModalProps {
  children?: React.ReactNode;
  show: boolean;
  setShowModal: (show: boolean) => void;
}

function Modal({ children, show, setShowModal }: ModalProps) {
  return (
    <ModalContext.Provider value={{ onClose: () => setShowModal(false) }}>
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

  return (
    <div ref={modalRef} className="image-modal-box">
      <div className="image-modal-header">
        <h3
          className="image-modal-close-btn"
          onClick={() => modalContext.onClose()}
        >
          &times;
        </h3>
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
