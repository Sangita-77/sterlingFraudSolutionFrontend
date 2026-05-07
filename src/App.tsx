import { useEffect } from 'react';
import {Routes, Route } from "react-router-dom";
import i18next from 'i18next';
import { useLanguage } from './contexts/LanguageContext';
import Index from "./features/index";
import DashboardLayout from "./features/AllDashBoards/admin/Layout/DashboardLayout";
import MainDashboard from "./features/AllDashBoards/admin/Pages/MainDashboard";
import Agents from "./features/AllDashBoards/admin/Pages/Agents";
import Customers from "./features/AllDashBoards/admin/Pages/Customers";
import Investigations from "./features/AllDashBoards/admin/Pages/Investigations";
import Insurance from "./features/AllDashBoards/admin/Pages/Insurance";
import WithdrawalRequests from "./features/AllDashBoards/admin/Pages/WithdrawalRequests";
import ConsultationRequests from "./features/AllDashBoards/admin/Pages/ConsultationRequests";
import Communication from "./features/AllDashBoards/admin/Pages/Communication";
import PermissionsRoles from "./features/AllDashBoards/admin/Pages/PermissionsRoles";
import Reports from "./features/AllDashBoards/admin/Pages/Reports"; 
import Settings from "./features/AllDashBoards/admin/Pages/Settings"; 
import Visualization from "./features/Pages/Visualization";
import ProtectedRoleRoute from "./Routes/ProtectedRoleRoute";

import AgentDashboardLayOut from "./features/AllDashBoards/agent/Layout/AgentDashboardLayOut";
import AgentMainDashboard from "./features/AllDashBoards/agent/DashBoards/AgentMainDashboard";
import AgentReports from "./features/AllDashBoards/agent/DashBoards/AgentReports";
import AgentSettings from "./features/AllDashBoards/agent/DashBoards/AgentSettings";

import CustomerDashboardLayOut from "./features/AllDashBoards/customer/Layout/CustomerDashboardLayOut";
import CustomerMainDashboard from "./features/AllDashBoards/customer/Pages/CustomerMainDashboard";
import CustomerReports from "./features/AllDashBoards/customer/Pages/CustomerReports";
import CustomerSettings from "./features/AllDashBoards/customer/Pages/CustomerSettings";
import { routes } from "./Routes/route";


function App() {
  const { currentLanguage } = useLanguage();

  // Update i18n language when currentLanguage changes
  useEffect(() => {
    i18next.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
      <Routes>
         {/* Index Start */}
          <Route path="/" element={<Index/>}/>
          <Route path="/visualization/new/:id" element={<Visualization/>}/>
         {/* Index End */}
          
          {/* User Start */}
          {/* User End */}  

          {/* Super-Admin Start */}
          <Route element={<ProtectedRoleRoute routeType="admin" />}>
            <Route path={routes.DASHBOARD} element={<DashboardLayout/>}>
              <Route index element={<MainDashboard/>} />
              <Route path={routes.AGENTS} element={<Agents/>} />
              <Route path={routes.CUSTOMERS} element={<Customers/>} />
              <Route path={routes.INVESTIGATIONS} element={<Investigations/>} />
              <Route path={routes.INSURANCE} element={<Insurance/>} />
              <Route path={routes.WITHDRAWALREQUESTS} element={<WithdrawalRequests/>} />
              <Route path={routes.CONSULTATIONREQUESTS} element={<ConsultationRequests/>} />
              <Route path={routes.COMUNICATION} element={<Communication/>} />
              <Route path={routes.PERMISSIONS} element={<PermissionsRoles/>} />
              <Route path={routes.REPORTS} element={<Reports/>} />
              <Route path={routes.SETTINGS} element={<Settings/>} />
              {/* Super-Admin Start */}
            </Route>
          </Route>
          <Route element={<ProtectedRoleRoute routeType="agent" />}>
            <Route path={routes.AGENT_DASHBOARD} element={<AgentDashboardLayOut />}>
              <Route index element={<AgentMainDashboard />} />
              <Route path={routes.AGENT_REPORTS} element={<AgentReports />} />
              <Route path={routes.AGENT_SETTINGS} element={<AgentSettings />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoleRoute routeType="customer" />}>
            <Route path={routes.CUSTOMER_DASHBOARD} element={<CustomerDashboardLayOut />}>
              <Route index element={<CustomerMainDashboard />} />
              <Route path={routes.ASSINGED_CASES} element={<CustomerReports />} />
              <Route path={routes.CUSTOMER_SETTINGS} element={<CustomerSettings />} />
              <Route path={routes.CUSTOMER_SETTINGS} element={<CustomerSettings />} />
              <Route path={routes.CUSTOMER_SETTINGS} element={<CustomerSettings />} />
            </Route>
          </Route>

      </Routes>
  );
}



export default App;
