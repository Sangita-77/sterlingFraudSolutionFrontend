import React, { useState } from "react";
import "../DashBoards/Dashboard.css";
import TableHeader from "./TableTableHeader";
import TableRow from "./TableRow";

const Table: React.FC = () => {
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

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  // pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  return (
    <div className="table-container">
      <h3 className="table-title">Recent Users</h3>

      <table className="table">
        <TableHeader />

        <tbody>
          {currentUsers.map((user, index) => (
            <TableRow key={index} user={user} />
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;