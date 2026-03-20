import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import MainDashboard from "./DashBoards/MainDashboard";
import Subscription from "./DashBoards/Subscription";
import Organization from "./DashBoards/Organization";
import Doctors from "./DashBoards/Doctors";
import PhychologicaEve from "./DashBoards/PhychologicalEve";
import Appointment from "./DashBoards/Appointment";
import Shop from "./DashBoards/Shop";
import Payments from "./DashBoards/Payments";
import Games from "./DashBoards/Games";
import Settings from "./DashBoards/Settings"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MainDashboard/>} />
          <Route path="subscription" element={<Subscription/>} />
          <Route path="organization" element={<Organization/>} />
          <Route path="doctors" element={<Doctors/>} />
          <Route path="phychologi_calevolution" element={<PhychologicaEve/>} />
          <Route path="appointment" element={<Appointment/>} />
          <Route path="shop" element={<Shop/>} />
          <Route path="payments" element={<Payments/>} />
          <Route path="games" element={<Games/>} />
          <Route path="settings" element={<Settings/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
