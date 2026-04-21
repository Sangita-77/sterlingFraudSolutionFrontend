import React from "react";
import "./Components.css";
import { NavLink } from "react-router-dom";
import { routes } from "../../../Routes/route";

import Logo from "../../../assets/images/Logo.webp";
import close from "../../../assets/images/close.svg";

import DashboardIcon from "../../../assets/images/Dashboard.svg";
import Agent from "../../../assets/images/Agent.svg";
import Customers from "../../../assets/images/Customers.svg";
import Investigations from "../../../assets/images/Investigations.svg";
import Insurance from "../../../assets/images/Insurance.svg";
import Withdrawal from "../../../assets/images/Withdrawal.svg";
import Consultation from "../../../assets/images/Consultation.svg";
import Communication from "../../../assets/images/Communication.svg";
import Permissions from "../../../assets/images/Permissions.svg";
import Reports from "../../../assets/images/Reports.svg";
import Settings from "../../../assets/images/Settings.svg";
import Logout from "../../../assets/images/LogOut.svg";

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggle }) => {

  const handleClick = () => {
    setTimeout(toggle, 100);
  };

  const menuItems = [
    { path: routes.DASHBOARD, label: "Dashboard", icon: DashboardIcon, end: true },
    { path: routes.AGENTS, label: "Agents", icon: Agent },
    { path: routes.CUSTOMERS, label: "Customers", icon: Customers },
    { path: routes.INSURANCE, label: "Insurance", icon: Insurance },
    { path: routes.INVESTIGATIONS, label: "Investigations", icon: Investigations },
    { path: routes.WITHDRAWALREQUESTS, label: "Withdrawal Requests", icon: Withdrawal },
    { path: routes.CONSULTATIONREQUESTS, label: "Consultation Requests", icon: Consultation },
    { path: routes.COMUNICATION, label: "Communication", icon: Communication },
    { path: routes.PERMISSIONS, label: "Permissions & Roles", icon: Permissions },
    { path: routes.REPORTS, label: "Reports", icon: Reports },
    { path: routes.SETTINGS, label: "Settings", icon: Settings },
  ];

  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      
      {/* Header */}
      <div className="LogoWrap">
        <div className="CompanyLogo">
          <img src={Logo} alt="CompanyLogo" />
        </div>
        <div className="closeButton" onClick={toggle}>
          <img src={close} alt="Close" />
        </div>
      </div>

      {/* Menu */}
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleClick}
            >
              <img src={item.icon} className="icon" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}

        {/* Logout */}
        <li>
          <NavLink to={routes.LOGOUT} className="Logout" onClick={handleClick}>
            <img src={Logout} className="icon" />
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;