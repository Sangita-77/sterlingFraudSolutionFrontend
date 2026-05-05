import React, { useEffect, useState } from "react";
import { useTheme } from "./useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //MOBILE UI (no sliding, just tap icon)
  if (isMobile) {
    return (
      <div
        onPointerDown={toggleTheme}
        style={{
          width: "25px",
          height: "30px",
          borderRadius: "50%",
          background: "var(--)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "20px",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </div>
    );
  }

  //DESKTOP UI (slider)
  return (
    <div
      onPointerDown={toggleTheme}
      style={{
        width: "60px",
        height: "30px",
        borderRadius: "50px",
        background: isDark ? "#ccc" : "var(--primary-color)", // flipped
        display: "flex",
        alignItems: "center",
        padding: "4px",
        cursor: "pointer",
        transition: "background 0.3s ease",
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: "#fff",
          transform: isDark ? "translateX(0px)" : "translateX(30px)", // flipped
          transition: "transform 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </div>
    </div>
  );
};

export default ThemeToggle;