import React from "react";
import DocumentUpdateCard from "../DocumentUpdateCard";
import PassportFrontIcon from "../../assets/images/PassportFrontIcon.svg";
import VarifiedIcon from "../../assets/images/VarifiedIcon.svg";
import UnderProgress from "../../assets/images/UnderProgress.svg";
UnderProgress

const PassportUpdate: React.FC = () => {

  return (
    <div className="PassportUpdate UpdatedocumentsWarp">

      <DocumentUpdateCard
      icon={PassportFrontIcon}
      text="front side of your Document"
      buttonText="Update"
      />

      <DocumentUpdateCard
      icon={UnderProgress}
      text="Welcome to Dashboard"
      buttonText="Under Progress"
      variant="orange"
      />

      <DocumentUpdateCard
      icon={VarifiedIcon}
      text="Welcome to Dashboard"
      buttonText="Verified"
      variant="green"
      />

    </div>
  );
};

export default PassportUpdate; 