import React, { useState } from "react";
import "./GlobalComponents.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "../../../Routes/route";
import { logoutUser, getAuthUser, getUserRole } from "../../../api/authService";

import Logo from "../assets/images/Logo.webp";
import close from "../assets/images/close.svg";
import ConfirmModal from "./GlobalModal";

import DashboardIcon from "../assets/images/Dashboard.svg";
import Agent from "../assets/images/Agent.svg";
import Customers from "../assets/images/Customers.svg";
import Investigations from "../assets/images/Investigations.svg";
import Insurance from "../assets/images/Insurance.svg";
import Withdrawal from "../assets/images/Withdrawal.svg";
import Consultation from "../assets/images/Consultation.svg";
import Communication from "../assets/images/Communication.svg";
import Permissions from "../assets/images/Permissions.svg";
import Reports from "../assets/images/Reports.svg";
import Settings from "../assets/images/Settings.svg";
import Logout from "../assets/images/LogOut.svg";

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({ open, toggle }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  //Get role INSIDE component
  const user = getAuthUser();
  const role = getUserRole(user);

  const handleClick = () => {
    setTimeout(toggle, 100);
  };
const menuItems = [

// Super Admin Start
  { path: routes.DASHBOARD, label: t("nav.dashboard"), icon: DashboardIcon, roles: ["admin"], end: true },
  { path: routes.AGENTS, label: t("nav.agents"), icon: Agent, roles: ["admin"] },
  { path: routes.CUSTOMERS, label: t("nav.customers"), icon: Customers, roles: ["admin"] },
  { path: routes.INSURANCE, label: t("nav.insurance"), icon: Insurance, roles: ["admin"] },
  { path: routes.INVESTIGATIONS, label: t("nav.investigations"), icon: Investigations, roles: ["admin"] },
  { path: routes.WITHDRAWALREQUESTS, label: t("nav.withdrawalRequests"), icon: Withdrawal, roles: ["admin"] },
  { path: routes.CONSULTATIONREQUESTS, label: t("nav.consultationRequests"), icon: Consultation, roles: ["admin"] },
  { path: routes.REPORTS, label: t("nav.reports"), icon: Reports, roles: ["admin"] },
  { path: routes.COMUNICATION, label: t("nav.communication"), icon: Communication, roles: ["admin"] },
  { path: routes.PERMISSIONS, label: t("nav.permissions"), icon: Permissions, roles: ["admin"] },
  { path: routes.SETTINGS, label: t("nav.settings"), icon: Settings, roles: ["admin"] },
// Super Admin End

// Agent Admin Start
    { path: routes.AGENT_DASHBOARD, label: t("nav.dashboard"), roles: ["agent"], icon: DashboardIcon, end: true },
    { path: routes.AGENT_REPORTS, label: t("nav.reports"), roles: ["agent"], icon: Reports },
    { path: routes.AGENT_SETTINGS, label: t("nav.settings"), roles: ["agent"], icon: Settings },
// Agent Admin End

// Customer  Start
    { path: routes.CUSTOMER_DASHBOARD, label: t("nav.dashboard"), roles: ["customer"], icon: DashboardIcon, end: true },
    { path: routes.ASSINGED_CASES, label: t("nav.reports"), roles: ["customer"], icon: Reports },
    { path: routes.CUSTOMER_SETTINGS, label: t("nav.settings"), roles: ["customer"],  icon: Settings },
// Customer  End

];

const confirmLogout = async () => {
  await logoutUser(true);
  navigate(routes.VERIFYCHAIN);
};


const filteredMenu = menuItems.filter(item =>
  item.roles.includes(role)
);

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
  {filteredMenu.map((item, index) => (
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
      <button type="button" className="Logout" onClick={() => setShowLogoutModal(true)} >
      <img src={Logout} className="icon" />
      <span>Logout</span>
    </button>
  </li>
</ul>


{/* Logout Popup */}

 {showLogoutModal && (
  <ConfirmModal
    title="Are you sure?"
    message="Do you really want to logout?"
    confirmText="Yes, Logout"
    cancelText="Cancel"
    onConfirm={confirmLogout}
    onCancel={() => setShowLogoutModal(false)}
  />
)}


    </div>
  );
};


export default Sidebar;