import React, { useState } from "react";
import "./Components.css";
import TableHeader from "./TableTableHeader";
import TableRow from "./TableRow";

interface User {
  name: string;
  email: string;
  status: string;
}
interface TableProps{
  users: User[];
}
const Table: React.FC<TableProps> = ({ users }) => {


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(users.length / itemsPerPage);
    
  // Select single row
  // const handleSelect = (index: number) => {
  //   setSelectedUsers((prev) =>
  //     prev.includes(index)
  //       ? prev.filter((i) => i !== index)
  //       : [...prev, index]
  //   );
  // };

  //Select all (current page)
  const handleSelectAll = () => {
    const pageIndexes = currentUsers.map((_, i) => startIndex + i);
    const allSelected = pageIndexes.every((i) =>
      selectedUsers.includes(i)
    );
    if (allSelected) {
      setSelectedUsers((prev) =>
        prev.filter((i) => !pageIndexes.includes(i))
      );
    } else {
      setSelectedUsers((prev) => [...new Set([...prev, ...pageIndexes])]);
    }
  };

  
  // Export CSV
  const exportCSV = () => {
    const selectedData = selectedUsers.map((i) => users[i]);

    const csv = [
      ["Name", "Email", "Status"],
      ...selectedData.map((u) => [u.name, u.email, u.status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };



return (
  <div className="table-container">
    <div className="table-header">
      <h3>Recent Users</h3>

      <div className="table-actions">
        <button
          className="btn primary"
          onClick={exportCSV}
          disabled={!selectedUsers.length}
        >
          Export CSV
        </button>
        <div className="table-controls">
          <label>Rows</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
              setSelectedUsers([]);
            }}
          >
            {[5, 10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>

    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="checkbox-col">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={currentUsers.length > 0 && currentUsers.every((_, i) =>
                  selectedUsers.includes(startIndex + i)
                )}
              />
            </th>
             <TableHeader
                headers={[
                  { label: "Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Status", key: "status" },
                ]}
            />
          </tr>
        </thead>

        {/* <tbody>
          {currentUsers.map((user, index) => {
            const actualIndex = startIndex + index;

            return (
              <tr key={index}>
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(actualIndex)}
                    onChange={() => handleSelect(actualIndex)}
                  />
                </td>

                <TableRow user={user} />
              </tr>
            );
          })}
        </tbody> */}
        <tbody>
        {currentUsers.map((user, index) => (
          <TableRow
            key={index}
            name={user.name}
            email={user.email}
            status={user.status}
          />
        ))}
      </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="pagination">
      <button
        className="btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        ← Prev
      </button>

      <span className="page-info">
        Page <b>{currentPage}</b> of <b>{totalPages}</b>
      </span>

      <button
        className="btn"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next →
      </button>
    </div>
  </div>
);

};

export default Table;