import React from "react";

interface GlobalButtons {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  textsize?: "sm" | "md";
  variant?: "purple" | "add" | "green" | "red" | "orange" | "blue" ;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  iconPosition?: "left" | "right"; 
}

const DashboardButtons: React.FC<GlobalButtons> = ({
  text,
  icon,
  onClick,
  textsize = "sm",
  type = "button",
  variant = "view",
  disabled = false,
  className = "",
  iconPosition = "left",
}) => {
  return (
    <div className="GlobalButton">
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`Global-button d-flex ${variant} ${textsize} ${className}`}
    >
      {iconPosition === "left" && icon}
      {text}
      {iconPosition === "right" && icon}
    </button>
    </div>
  );
};

export default DashboardButtons;