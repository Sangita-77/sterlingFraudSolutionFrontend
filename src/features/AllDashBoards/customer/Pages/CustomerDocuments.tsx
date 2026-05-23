import React from "react";
import { Heading1 } from "../../GlobalComponents/HeadingPara";
import Tabs from "../../GlobalComponents/Tabs";
import PassportUpdate from "../../GlobalComponents/Tabs/CutomerDocsTab/PassportUpdate";
import NationalIdCard from "../../GlobalComponents/Tabs/CutomerDocsTab/NationalIdCard";
import DrivingLicense from "../../GlobalComponents/Tabs/CutomerDocsTab/DrivingLicense";



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