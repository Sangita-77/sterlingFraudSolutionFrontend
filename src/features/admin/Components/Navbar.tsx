import React, { useState } from "react";
import "./Components.css";
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
      {/* LEFT SIDE */}
      <div className="nav-left">
        <span className="menu-toggle" onClick={toggle}><img src={hamburger} className="menu_icon" /></span>

        <div className="search-box">
          <img src={Search} className="search" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {/* Notification */}
        <div className="notification">
          <img src={Bell} className="search"  onClick={() => setShowNotifications(!showNotifications)} />

          {showNotifications && (
            <div className="notification-dropdown">
              <p>No new notifications</p>
              {/* You can map notifications here */}
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="admin-profile">
          <img src={Admin} alt="admin" />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;