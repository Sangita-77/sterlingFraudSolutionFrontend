import React from "react";
// import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import Table from "../Components/Table";
import "./Dashboard.css";

const MainDashboard: React.FC = () => {
 const users = [
    { name: "John Doe", email: "john@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { name: "Alice Brown", email: "alice@example.com", status: "Active" },
    { name: "Bob White", email: "bob@example.com", status: "Inactive" },
    { name: "Tom Hardy", email: "tom@example.com", status: "Active" },
    { name: "Emma Stone", email: "emma@example.com", status: "Active" },
    { name: "Chris Evans", email: "chris@example.com", status: "Inactive" },
    { name: "Scarlett", email: "scarlett@example.com", status: "Active" },
    { name: "Bruce Wayne", email: "bruce@example.com", status: "Active" },
    { name: "Clark Kent", email: "clark@example.com", status: "Inactive" },
    { name: "Tony Stark", email: "tony@example.com", status: "Active" },
    { name: "Peter Parker", email: "peter@example.com", status: "Inactive" },
  ];


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
      <Table users={users}/>
      
    </>
  );
};

export default MainDashboard;