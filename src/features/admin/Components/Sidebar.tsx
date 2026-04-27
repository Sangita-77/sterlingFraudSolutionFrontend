import React from "react";
import "./Components.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const handleClick = () => {
    setTimeout(toggle, 100);
  };

  const menuItems = [
    { path: routes.DASHBOARD, label: t('nav.dashboard'), icon: DashboardIcon, end: true },
    { path: routes.AGENTS, label: t('nav.agents'), icon: Agent },
    { path: routes.CUSTOMERS, label: t('nav.customers'), icon: Customers },
    { path: routes.INSURANCE, label: t('nav.insurance'), icon: Insurance },
    { path: routes.INVESTIGATIONS, label: t('nav.investigations'), icon: Investigations },
    { path: routes.WITHDRAWALREQUESTS, label: t('nav.withdrawalRequests'), icon: Withdrawal },
    { path: routes.CONSULTATIONREQUESTS, label: t('nav.consultationRequests'), icon: Consultation },
    { path: routes.COMUNICATION, label: t('nav.communication'), icon: Communication },
    { path: routes.PERMISSIONS, label: t('nav.permissions'), icon: Permissions },
    { path: routes.REPORTS, label: t('nav.reports'), icon: Reports },
    { path: routes.SETTINGS, label: t('nav.settings'), icon: Settings },
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