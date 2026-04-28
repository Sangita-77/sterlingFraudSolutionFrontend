import { useEffect } from 'react';
import {Routes, Route } from "react-router-dom";
import i18next from 'i18next';
import { useLanguage } from './contexts/LanguageContext';
import Index from "./features/index";
import DashboardLayout from "./features/admin/Layout/DashboardLayout";
import MainDashboard from "./features/admin/DashBoards/MainDashboard";
import Agents from "./features/admin/DashBoards/Agents";
import Customers from "./features/admin/DashBoards/Customers";
import Investigations from "./features/admin/DashBoards/Investigations";
import Insurance from "./features/admin/DashBoards/Insurance";
import WithdrawalRequests from "./features/admin/DashBoards/WithdrawalRequests";
import ConsultationRequests from "./features/admin/DashBoards/ConsultationRequests";
import Communication from "./features/admin/DashBoards/Communication";
import PermissionsRoles from "./features/admin/DashBoards/PermissionsRoles";
import Reports from "./features/admin/DashBoards/Reports"; 
import Settings from "./features/admin/DashBoards/Settings"; 
import Visualization from "./features/Pages/Visualization";
import ProtectedRoleRoute from "./Routes/ProtectedRoleRoute";
import AgentDashboardLayOut from "./features/agent/Layout/AgentDashboardLayOut";
import AgentMainDashboard from "./features/agent/DashBoards/AgentMainDashboard";
import AgentReports from "./features/agent/DashBoards/AgentReports";
import AgentSettings from "./features/agent/DashBoards/AgentSettings";
import CustomerDashboardLayOut from "./features/customer/Layout/CustomerDashboardLayOut";
import CustomerMainDashboard from "./features/customer/DashBoards/CustomerMainDashboard";
import CustomerReports from "./features/customer/DashBoards/CustomerReports";
import CustomerSettings from "./features/customer/DashBoards/CustomerSettings";
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
              <Route path={routes.CUSTOMER_REPORTS} element={<CustomerReports />} />
              <Route path={routes.CUSTOMER_SETTINGS} element={<CustomerSettings />} />
            </Route>
          </Route>
      </Routes>
  );
}

export default App;
