import { useState, useEffect } from "react";
import Button from "../../components/Button";
import "./styles.css";

const Modal = ({ children, title, content, open, onCancel, contextButton }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (open) {
      setIsFadingOut(false);
    }
  }, [open]);

  const handleClose = () => {
    setIsFadingOut(true);

    setTimeout(() => {
      onCancel();
    }, 100);
  };

  return (
    <div>
      {children}
      {open && (
        <div className={`modalOverlay ${isFadingOut ? "fade-out" : ""}`}>
          <div className="modalContent">
            <h2 className="modalTitle">{title}</h2>
            <div className="modalText">{content}</div>
            <div className="button-group">
              <Button btn="cancel" onClick={handleClose}>
                Close
              </Button>
              {contextButton}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
