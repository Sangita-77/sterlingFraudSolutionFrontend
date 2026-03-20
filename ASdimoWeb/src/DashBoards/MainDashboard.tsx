import React from "react";
import Card from "../Components/Card";
import Table from "../Components/Table";
import "./Dashboard.css";

const MainDashboard: React.FC = () => {
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