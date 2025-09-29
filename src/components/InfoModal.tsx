import React, { ReactNode } from "react";
import "../styles/modal.css";

interface InfoModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="info-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div className="info-modal" role="document">
        <button type="button" className="info-modal-close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
        <h2 id="info-modal-title" className="info-modal-title">
          {title}
        </h2>
        <div className="info-modal-content">{children}</div>
        <button type="button" className="info-modal-action" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
