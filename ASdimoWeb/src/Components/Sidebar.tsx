import React from "react";
import "../DashBoards/Dashboard.css";

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <h2>Admin</h2>

      <ul>
        {[
          "Dashboard",
          "Users",
          "Products",
          "Orders",
          "Analytics",
          "Settings",
        ].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;