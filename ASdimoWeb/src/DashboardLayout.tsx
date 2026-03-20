import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import MainDashboard from "./DashBoards/MainDashboard";
import "./DashBoards/Dashboard.css";

const DashboardLayOut: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (desktop) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard">
      
      {/* Sidebar */}
      <Sidebar open={isDesktop ? true : open} />

      {/* Main */}
      <div className={`main ${isDesktop ? "desktop" : ""}`}>
        
        <Navbar toggle={() => !isDesktop && setOpen(!open)} />
          <div className="content">
             <MainDashboard/>
          </div>

        </div>

      
    </div>
  );
};

export default DashboardLayOut;