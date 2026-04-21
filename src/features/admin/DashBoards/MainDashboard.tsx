import React from "react";
// import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import "./Dashboard.css";
import TotalAgents from "../../../assets/images/TotalAgents.svg";
import TotalUsers from "../../../assets/images/TotalUsers.svg";
import AssignedCases from "../../../assets/images/AssignedCases.svg";



const MainDashboard: React.FC = () => {


  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/api/v1/auth/getAllUsers", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer YOUR_TOKEN_HERE",
  //         },
  //       });

  //       const data = await res.json();

  //       if (data.success) {
  //         console.log(".................................",data.data);
  //         setUsers(data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);



  return (
    <>
    <div className="MainDashboard Dashboards">
      <div className="DashboardLeft">
        <h2>Dashboard</h2>
          {/* Cards */}
          <div className="cards">
            <Card title="Total Agents" value="24" icon={TotalAgents} variant="blue"/>
            <Card title="Total Users" value="1,205" icon={TotalUsers} variant="purple"/>
            <Card title="Assigned Cases" value="128" icon={AssignedCases} variant="pink"/>
          </div>
      </div> 
      <div className="DashboardRight">

      </div>  
    </div>
      
    </>
  );
};

export default MainDashboard;