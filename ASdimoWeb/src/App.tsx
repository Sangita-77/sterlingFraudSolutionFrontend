// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import DashboardPage from "./DashBoards/DashboardPage";
// import Users from "./DashBoards/Users";
// import Products from "./DashBoards/Products";
// import DashboardLayout from "./DashboardLayout";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<DashboardLayout />}>
//           <Route index element={<DashboardPage />} />
//           <Route path="users" element={<Users />} />
//           <Route path="products" element={<Products />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import DashboardLayOut from "./DashboardLayout";

function App() {
return (
  <DashboardLayOut/>
);
}

 export default App;
