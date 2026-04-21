import {Routes, Route } from "react-router-dom";
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


function App() {
  return (
      <Routes>
         {/* Index Start */}
          <Route path="/" element={<Index/>}/>
          <Route path="/visualization/new/:id" element={<Visualization/>}/>
         {/* Index End */}
          
          {/* User Start */}
          {/* User End */}

          {/* Super-Admin Start */}
          <Route path="/admin" element={<DashboardLayout/>}>
          <Route index element={<MainDashboard/>} />
          <Route path="/admin/agents" element={<Agents/>} />
          <Route path="/admin/customers" element={<Customers/>} />
          <Route path="/admin/investigations" element={<Investigations/>} />
          <Route path="/admin/insurance" element={<Insurance/>} />
          <Route path="/admin/withdrawal-requests" element={<WithdrawalRequests/>} />
          <Route path="/admin/consultation-requests" element={<ConsultationRequests/>} />
          <Route path="/admin/communication" element={<Communication/>} />
          <Route path="/admin/permissions" element={<PermissionsRoles/>} />
          <Route path="/admin/reports" element={<Reports/>} />
          <Route path="/admin/settings" element={<Settings/>} />
          {/* Super-Admin Start */}

        </Route>
      </Routes>
  );
}

export default App;
