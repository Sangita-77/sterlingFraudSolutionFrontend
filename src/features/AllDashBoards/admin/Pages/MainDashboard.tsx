import React from "react";
// import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Card from "../Components/Card";
import "./Dashboard.css";
import TotalAgents from "../../assets/images/TotalAgents.svg";
import TotalUsers from "../../assets/images/TotalUsers.svg";
import AssignedCases from "../../assets/images/AssignedCases.svg";



const MainDashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
    <div className="MainDashboard Dashboards">
      <div className="DashboardLeft">
        <h2>{t('nav.dashboard')}</h2>
          {/* Cards */}
          <div className="cards">
            <Card title={t('dashboard.totalAgents')} value="24" icon={TotalAgents} variant="blue"/>
            <Card title={t('dashboard.totalUsers')} value="1,205" icon={TotalUsers} variant="purple"/>
            <Card title={t('dashboard.assignedCases')} value="128" icon={AssignedCases} variant="pink"/>
          </div>
      </div> 
      <div className="DashboardRight">

      </div>  
    </div>
      
    </>
  );
};

export default MainDashboard;