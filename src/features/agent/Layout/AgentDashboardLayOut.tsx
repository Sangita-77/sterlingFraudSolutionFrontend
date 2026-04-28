import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../../admin/DashBoards/Dashboard.css";

const AgentDashboardLayOut: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setOpen(desktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar
        open={isDesktop ? true : open}
        toggle={() => !isDesktop && setOpen(!open)}
      />

      <div className={`main ${isDesktop ? "desktop" : ""}`}>
        <Navbar toggle={() => !isDesktop && setOpen(!open)} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AgentDashboardLayOut;
