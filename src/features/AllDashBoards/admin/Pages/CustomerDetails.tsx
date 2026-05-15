import React from "react";
import Tabs from "../../GlobalComponents/Tabs";
import CustomerDetailsProfile from "../../GlobalComponents/Tabs/CustomerDetailsTabs/CustomerDetailsProfile";
import CustomerDetailsDoc from "../../GlobalComponents/Tabs/CustomerDetailsTabs/CustomerDetailsDoc";


  const tabsData = [
    {
      label: "Customer Profile",
      content: <CustomerDetailsProfile/>,
    },
    {
      label: "Documents",
      content: <CustomerDetailsDoc/>,
    },
    {
      label: "Case Details",
      content: <></>,
    },
    {
      label: "Withdrawal Request",
      content: <></>,
    },
    {
      label: "Bank Details",
      content: <></>,
    },
    {
      label: "Insurance",
      content: <></>,
    },
  ];

const CustomerDetails: React.FC = () => {

  return (
    <div className="CustomerDocuments">   
       <Tabs tabs={tabsData} variant="underline"/>
    </div>
  );
};

export default CustomerDetails; 