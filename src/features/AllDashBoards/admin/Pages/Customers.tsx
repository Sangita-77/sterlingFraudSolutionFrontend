import React from "react";
import { Heading1} from "../../GlobalComponents/HeadingPara";
import CustomerTable from "../Components/CustomerTable";


const AdminCustomer: React.FC = () => {

  return (
    <div className="CustomerSettings">
      <Heading1 text="Customers" />
      <CustomerTable/>
    </div>
  );
};

export default AdminCustomer; 