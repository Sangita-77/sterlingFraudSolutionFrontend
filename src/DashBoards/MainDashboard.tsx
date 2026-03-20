import React from "react";
// import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import Table from "../Components/Table";
import "./Dashboard.css";

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
      
      {/* Cards */}
      <div className="cards">
        <Card title="Total Users" value="1,245" />
        <Card title="Orders" value="532" />
        <Card title="Revenue" value="$12,450" />
        <Card title="Sessions" value="87" />
      </div>

      {/* Table */}
      <Table />
      
    </>
  );
};

export default MainDashboard;