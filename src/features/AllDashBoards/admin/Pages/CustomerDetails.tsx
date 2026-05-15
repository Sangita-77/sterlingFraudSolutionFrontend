import React from "react";
import Tabs from "../../GlobalComponents/Tabs";
import CustomerDetailsProfile from "../../GlobalComponents/Tabs/CustomerDetailsTabs/CustomerDetailsProfile";
import NationalIdCard from "../../GlobalComponents/Tabs/NationalIdCard";
import DrivingLicense from "../../GlobalComponents/Tabs/DrivingLicense";



  const tabsData = [
    {
      label: "Customer Profile",
      content: <CustomerDetailsProfile/>,
    },
    {
      label: "Documents",
      content: <NationalIdCard/>,
    },
    {
      label: "Case Details",
      content: <DrivingLicense/>,
    },
    {
      label: "Withdrawal Request",
      content: <DrivingLicense/>,
    },
    {
      label: "Bank Details",
      content: <DrivingLicense/>,
    },
    {
      label: "Insurance",
      content: <DrivingLicense/>,
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