import React, { useState } from "react";
import "../../admin/Components/Components.css";
import Search from "../../../assets/images/Search.svg";
import Bell from "../../../assets/images/Bell.svg";
import Admin from "../../../assets/images/Admin.webp";
import hamburger from "../../../assets/images/hamburger.svg";

interface NavbarProps {
  toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggle }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="navbar">
      <div className="nav-left">
        <span className="menu-toggle" onClick={toggle}>
          <img src={hamburger} className="menu_icon" />
        </span>

        <div className="search-box">
          <img src={Search} className="search" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="nav-right">
        <div className="notification">
          <img
            src={Bell}
            className="search"
            onClick={() => setShowNotifications(!showNotifications)}
          />

          {showNotifications && (
            <div className="notification-dropdown">
              <p>No new notifications</p>
            </div>
          )}
        </div>

        <div className="admin-profile">
          <img src={Admin} alt="agent" />
          <span>Agent</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
