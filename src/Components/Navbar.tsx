import React from "react";
import "../DashBoards/Dashboard.css";

interface NavbarProps {
  toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggle }) => {
  return (
    <div className="navbar">
      <span className="menu-toggle" onClick={toggle}>☰</span>

      <h3>Super Admin</h3>
      <div>Admin</div>
    </div>
  );
};

export default Navbar;