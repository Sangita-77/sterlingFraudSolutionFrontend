import React from "react";
import "./GlobalComponents.css";
// import Search from "../assets/images/Search.svg";
import hamburger from "../assets/images/hamburger.svg";
import Toggle from "./Toggle"
import LanguageSwitcher from "../../Components/LanguageSwitcher";
import ProfileAvatar from "./ProfileAvatar";
import NotificationBell from "./NotificationBell";


interface NavbarProps {
  toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggle }) => {
  return (
    <div className="navbar">
      {/* LEFT SIDE */}
      <div className="nav-left">
        <span className="menu-toggle" onClick={toggle}><img src={hamburger} className="menu_icon" /></span>

        {/* <div className="search-box">
          <img src={Search} className="search" />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <LanguageSwitcher />
        <Toggle/>
        <NotificationBell />

        <ProfileAvatar label="Admin" />
      </div>
    </div>
  );
};

export default Navbar;
