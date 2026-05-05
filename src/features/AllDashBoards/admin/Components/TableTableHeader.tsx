import React from "react";

interface Header {
  label: string;
  key: string;
}

interface TableHeaderProps {
  headers: Header[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <>
      {headers.map((h) => (
        <th key={h.key}>{h.label}</th>
      ))}
    </>
  );
};

export default TableHeader;