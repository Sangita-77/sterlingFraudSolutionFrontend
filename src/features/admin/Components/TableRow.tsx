import React from "react";

interface Props {
  name: string;
  email: string;
  status: string;
}

const TableRow: React.FC<Props> = ({ name, email, status }) => {
  return (
    <tr>
      <td><input type="checkbox"/></td>
      <td data-label="Name">{name}</td>
      <td data-label="Email">{email}</td>
      <td
        className={
          status === "Active"
            ? "status-active"
            : "status-inactive"
        }
      >
        {status}
      </td>
    </tr>
  );
};

export default TableRow;