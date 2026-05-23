import React from "react";
import "../../GlobalComponents/GlobalComponents.css";
import Search from "../../assets/images/Search.svg";
import hamburger from "../../assets/images/hamburger.svg";
import LanguageSwitcher from "../../../Components/LanguageSwitcher";
import ProfileAvatar from "../../GlobalComponents/ProfileAvatar";
import NotificationBell from "../../GlobalComponents/NotificationBell";

interface NavbarProps {
  toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggle }) => {
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
        <NotificationBell />

        <ProfileAvatar label="Agent" />
      </div>
    </div>
  );
};

export default Navbar;
