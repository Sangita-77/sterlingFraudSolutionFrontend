import React from "react";
import DocumentUpdateCard from "../DocumentUpdateCard";
import PassportFrontIcon from "../../assets/images/PassportFrontIcon.svg";

const DrivingLicense: React.FC = () => {

  return (
    <div className="DrivingLicense UpdatedocumentsWarp">

      <DocumentUpdateCard
      icon={PassportFrontIcon}
      text="front side of your Document"
      buttonText="Update"
      />

      <DocumentUpdateCard
      icon={PassportFrontIcon}
      text="Welcome to Dashboard"
      buttonText="Update"
      variant="orange"
      />

      <DocumentUpdateCard
      icon={PassportFrontIcon}
      text="Welcome to Dashboard"
      buttonText="Verified"
      variant="green"
      />

    </div>
  );
};
export default DrivingLicense; 