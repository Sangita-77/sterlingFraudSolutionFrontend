import React from "react";
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