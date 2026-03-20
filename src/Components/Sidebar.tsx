import React from "react";
import "../DashBoards/Dashboard.css";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <h2>ASdimo</h2>
      <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink></li>
          <li><NavLink to="/subscription" className={({ isActive }) => isActive ? "active" : ""}>Subscription</NavLink></li>
          <li><NavLink to="/organization" className={({ isActive }) => isActive ? "active" : ""}>Organization</NavLink></li>
          <li><NavLink to="/doctors" className={({ isActive }) => isActive ? "active" : ""}>Doctors/Therapist</NavLink></li>
          <li><NavLink to="/phychologi_calevolution" className={({ isActive }) => isActive ? "active" : ""}>Phychological Evolution Page</NavLink></li>
          <li><NavLink to="/appointment" className={({ isActive }) => isActive ? "active" : ""}>Appointment</NavLink></li>
          <li><NavLink to="/shop" className={({ isActive }) => isActive ? "active" : ""}>Shop</NavLink></li>
          <li><NavLink to="/payments" className={({ isActive }) => isActive ? "active" : ""}>Payments</NavLink></li>
          <li><NavLink to="/games" className={({ isActive }) => isActive ? "active" : ""}>Games</NavLink></li>
          <li><NavLink to="/Settings" className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;