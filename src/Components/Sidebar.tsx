import React from "react";
import "../DashBoards/Dashboard.css";
import { NavLink } from "react-router-dom";
import { routes } from "../Routes/route";

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <h2>ASdimo</h2>

      <ul>
        <li><NavLink to={routes.DASHBOARD} end className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink> </li>
        <li><NavLink to={routes.SUBSCRIPTION} className={({ isActive }) => isActive ? "active" : ""}>Subscription</NavLink></li>
        <li><NavLink to={routes.ORGANIZATION} className={({ isActive }) => isActive ? "active" : ""}>Organization</NavLink></li>
        <li><NavLink to={routes.DOCTORS} className={({ isActive }) => isActive ? "active" : ""}>Doctors/Therapist</NavLink></li>
        <li><NavLink to={routes.PSYCHOLOGY} className={({ isActive }) => isActive ? "active" : ""}>Phychological Evolution Page</NavLink></li>
        <li><NavLink to={routes.APPOINTMENT} className={({ isActive }) => isActive ? "active" : ""}>Appointment</NavLink></li>
        <li><NavLink to={routes.SHOP} className={({ isActive }) => isActive ? "active" : ""}>Shop</NavLink></li>
        <li><NavLink to={routes.PAYMENTS} className={({ isActive }) => isActive ? "active" : ""}>Payments</NavLink></li>
        <li><NavLink to={routes.GAMES} className={({ isActive }) => isActive ? "active" : ""}>Games</NavLink></li>
        <li><NavLink to={routes.SETTINGS} className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;