import React from "react";
import { Heading1, Paragraph } from "../../GlobalComponents/HeadingPara";
import Profile from "../../GlobalComponents/Profile";


const AgentSettings: React.FC = () => {

  return (
    <div className="CustomerSettings">
      <Heading1 text="Settings" />
      <Paragraph text="Manage system Preference and configuration" />
            <Profile/>
    </div>
  );
};

export default AgentSettings; 