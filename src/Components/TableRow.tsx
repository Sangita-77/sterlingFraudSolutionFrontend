import React from "react";

interface User {
  name: string;
  email: string;
  status: string;
}

interface Props {
  user: User;
}

const TableRow: React.FC<Props> = ({ user }) => {
  return (
    <tr data-label="Name">
      <td data-label="Email">{user.name}</td>
      <td data-label="Status">{user.email}</td>
      <td
        className={
          user.status === "Active"
            ? "status-active"
            : "status-inactive"
        }
      >
        {user.status}
      </td>
    </tr>
  );
};

export default TableRow;