import React from "react";
import "../IndexComponents.css";
import Buttons from "../ButtonCompo";

type RegisterSuccessProps = {
  onLogin: () => void;
  title?: string;
  message?: string;
};

const RegisterSuccess: React.FC<RegisterSuccessProps> = ({
  onLogin,
  title = "Registration Successful",
  message = "Your account has been created successfully. Please login with your credentials to continue.",
}) => {
  return (
    <div className="registerSuccess">
      <div className="registerSuccessCard">
        <h3>{title}</h3>
        <p>{message}</p>
        <Buttons
          text="LOGIN NOW"
          variant="primary"
          size="full"
          onClick={onLogin}
        />
      </div>
    </div>
  );
};

export default RegisterSuccess;
