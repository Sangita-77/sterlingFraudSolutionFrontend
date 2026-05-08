import React from "react";
interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  text = "Loading...",
  fullScreen = false,
}) => {
  return (
    <div className={`loader-wrapper ${fullScreen ? "fullscreen" : ""}`}>
      <div className="loader-spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default Loader;