import React, { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      // 🔥 delay to allow animation
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);

      setTimeout(() => setShouldRender(false), 300); // match CSS
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`modal-overlay ${animate ? "open" : "close"}`}
      onClick={onClose}
    >
      <div
        className={`modal-box ${animate ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;