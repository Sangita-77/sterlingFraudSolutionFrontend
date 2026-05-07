import React, { useState } from "react";
import "../../GlobalComponents/GlobalComponents.css";
import Search from "../../assets/images/Search.svg";
import Bell from "../../assets/images/Bell.svg";
import hamburger from "../../assets/images/hamburger.svg";
import LanguageSwitcher from "../../../Components/LanguageSwitcher";
import ProfileAvatar from "../../GlobalComponents/ProfileAvatar";

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
        <LanguageSwitcher />
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

        <ProfileAvatar label="Customer" />
      </div>
    </div>
  );
};

export default Navbar;
