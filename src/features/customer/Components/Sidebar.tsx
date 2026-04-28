import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "../../../Routes/route";
import "../../admin/Components/Components.css";
import { logoutUser } from "../../../api/authService";

import Logo from "../../../assets/images/Logo.webp";
import close from "../../../assets/images/close.svg";
import DashboardIcon from "../../../assets/images/Dashboard.svg";
import Reports from "../../../assets/images/Reports.svg";
import Settings from "../../../assets/images/Settings.svg";
import Logout from "../../../assets/images/LogOut.svg";

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggle }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    setTimeout(toggle, 100);
  };

  const handleLogout = async () => {
    handleClick();
    await logoutUser(true);
    navigate(routes.VERIFYCHAIN);
  };

  const menuItems = [
    { path: routes.CUSTOMER_DASHBOARD, label: t("nav.dashboard"), icon: DashboardIcon, end: true },
    { path: routes.CUSTOMER_REPORTS, label: t("nav.reports"), icon: Reports },
    { path: routes.CUSTOMER_SETTINGS, label: t("nav.settings"), icon: Settings },
  ];

  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <div className="LogoWrap">
        <div className="CompanyLogo">
          <img src={Logo} alt="CompanyLogo" />
        </div>
        <div className="closeButton" onClick={toggle}>
          <img src={close} alt="Close" />
        </div>
      </div>

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

        <li>
          <button type="button" className="Logout" onClick={handleLogout}>
            <img src={Logout} className="icon" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
