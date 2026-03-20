import React from "react";

const TableHeader: React.FC = () => {
  const headers = ["Name", "Email", "Status"];

  return (
    <thead>
      <tr>
        {headers.map((h) => (
          <th key={h}>{h}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;