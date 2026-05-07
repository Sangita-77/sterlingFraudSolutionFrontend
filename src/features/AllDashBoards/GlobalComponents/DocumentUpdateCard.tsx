import React, { useRef } from "react";
import "./GlobalComponents.css";

type CardVariant = "purple" | "green" | "orange";

interface CardProps {
  icon: string;
  text: string;
  buttonText: string;
  variant?: CardVariant;
  onFileSelect?: (file: File) => void;
}

const IconTextButtonCard: React.FC<CardProps> = ({
  icon,
  text,
  buttonText,
  variant = "purple",
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    
    <div className={`icon-card ${variant}`}>
      <div className="icon-card-content">
        <img src={icon} alt="icon" className="icon-card-image" />

        <p className="icon-card-text">{text}</p>

        <button
          type="button"
          className="icon-card-button"
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default IconTextButtonCard;