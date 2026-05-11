import Table from "../../GlobalComponents/Table";
import Search from "../../assets/images/Search.svg";
import Button from "../../GlobalComponents/GlobalButtons";

const CustomerTable = () => {
  const columns = [
    { key: "name", title: "Name", },
    { key: "location", title: "Location", },
    { key: "number", title: "Number", },
    { key: "email", title: "Mail ID", },
    { key: "amount", title: "Amount", },
    { key: "status", title: "Status", render: (status: string) => ( <Button text={status} variant={ status === "Active" ? "green" : "red" } /> ), },
    { key: "action", title: "Action", render: () => <Button text="View" />,},

  ];

  const rows = [
    { id: 1, name: "John Doe", email: "john@example.com", location: "Germany", status: "Active",},
    { id: 2, name: "Jane Smith", email: "jane@example.com", location: "Croatia", status: "Inactive", },
    { id: 3, name: "Michael Brown", email: "michael@example.com", location: "UK", status: "Active", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", location: "Germany", status: "Inactive", },
  ];

  return (
    <div className="CustomerList">
      <div className="ListTopWrap">
        <div className="SearchWrap">
          <div className="search-box">
          <img src={Search} className="search" />
          <input type="text" placeholder="Search..." />
          <select>
            <option value="">Sort by Location A-Z</option>
            <option value="">Sort by Location Z-A</option>
            <option value="">Sort by Name A-Z</option>
            <option value="">Sort by Name Z-A</option>
            <option value="">Sort by Active</option>
            <option value="">Sort by Pending</option>
          </select>
        </div>
      </div>
    </div>
    
      <Table
        columns={columns}
        rows={rows}
        selectable={true}
        pagination={true}
        rowsPerPageOptions={[10, 20, 50, 100]}
        onBulkDelete={true}
      />
    </div>
  );
};

export default CustomerTable;