import React from "react";
import "../DashBoards/Dashboard.css";

const Table: React.FC = () => {
  const users = [
    { name: "John Doe", email: "john@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  ];

  return (
    <div className="table-container">
      <h3 className="table-title">Recent Users</h3>

      <table className="table">
        <thead>
          <tr>
            {["Name", "Email", "Status"].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td
                className={
                  u.status === "Active"
                    ? "status-active"
                    : "status-inactive"
                }
              >
                {u.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;