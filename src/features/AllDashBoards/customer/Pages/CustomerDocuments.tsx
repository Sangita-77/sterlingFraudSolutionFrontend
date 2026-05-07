import React from "react";
import { Heading1 } from "../../GlobalComponents/HeadingPara";
import Tabs from "../../GlobalComponents/Tabs";
import PassportUpdate from "../../GlobalComponents/Tabs/PassportUpdate"


  const tabsData = [
    {
      label: "Passport",
      content: <PassportUpdate/>,
    },
    {
      label: "National ID Card",
      content: <h2>About Content</h2>,
    },
    {
      label: "Driving License",
      content: <h2>Contact Content</h2>,
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