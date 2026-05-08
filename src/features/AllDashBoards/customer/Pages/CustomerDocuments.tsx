import React from "react";
import { Heading1 } from "../../GlobalComponents/HeadingPara";
import Tabs from "../../GlobalComponents/Tabs";
import PassportUpdate from "../../GlobalComponents/Tabs/PassportUpdate";
import NationalIdCard from "../../GlobalComponents/Tabs/NationalIdCard";
import DrivingLicense from "../../GlobalComponents/Tabs/DrivingLicense";



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

const CustomerDocuments: React.FC = () => {

  return (
    <div className="CustomerDocuments">
      <Heading1 text="Documents" />
       <Tabs tabs={tabsData} />
    </div>
  );
};

export default CustomerDocuments; 