import React from "react";
import Tabs from "../../Tabs";
import PassportUpdate from "../PassportUpdate";
import NationalIdCard from "../NationalIdCard";
import DrivingLicense from "../DrivingLicense";

  const tabsData = [
    {
      label: "Passport",
      content: <PassportUpdate/>,
    },
    {
      label: "National ID Card",
      content: <NationalIdCard/>,
    },
    {
      label: "Driving License",
      content: <DrivingLicense/>,
    },
  ];

const CustomerDetailsDoc: React.FC = () => {

  return (
    <div className="CustomerDocuments">   
       <Tabs tabs={tabsData} />
    </div>
  );
};

export default CustomerDetailsDoc; 