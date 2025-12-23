import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./Modal.css";
import { ModalContext, useModal } from "./ModalContext";

interface ModalProps {
  children?: React.ReactNode;
  show: boolean;
  setShowModal: (show: boolean) => void;
}

function Modal({ children, show, setShowModal }: ModalProps) {
  return (
    <ModalContext.Provider value={{ onClose: () => setShowModal(false)}}>
      <AnimatePresence>
        {show && <motion.div  className={`image-modal-backdrop`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0}}>{children}</motion.div>}
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
      {children}
    </div>
  );
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  const modalContext = useModal();
  return (
    <div className="image-modal-header">
      <h4 className="image-modal-title">{children}</h4>
      <h3
        className="image-modal-close-btn"
        onClick={() => modalContext.onClose()}
      >
        &times;
      </h3>
    </div>
  );
}

(Modal as any).Header = ModalHeader;
(Modal as any).Box = ModalBox;

export default Modal as typeof Modal & {
  Header: typeof ModalHeader;
  Box: typeof ModalBox;
};
