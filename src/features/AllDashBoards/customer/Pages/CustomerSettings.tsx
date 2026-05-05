import React from "react";
import { Heading1, Paragraph } from "../../GlobalComponents/HeadingPara";

const CustomerSettings: React.FC = () => {
  return (
    <div className="CustomerSettings">
      <Heading1 text="Settings" />
      <Paragraph text="Manage system Preference and configuration" />
      <div className="gradientBox">
        
      </div>
    </div>
  );
};

export default CustomerSettings;