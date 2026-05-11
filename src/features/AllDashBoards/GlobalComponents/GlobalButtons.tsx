import React from "react";

interface GlobalButtons {
  text: string;
  onClick?: () => void;

  // HTML button type
  type?: "button" | "submit" | "reset";

  // Custom button style/type
  variant?: "view" | "add" | "green" | "red" ;

  disabled?: boolean;
  className?: string;
}

const DashboardButtons: React.FC<GlobalButtons> = ({
  text,
  onClick,
  type = "button",
  variant = "view",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`Global-button ${variant} ${className}`}
    >
      {text}
    </button>
  );
};

export default DashboardButtons;