import React from "react";
import "../Componets.css";
import Buttons from "../ButtonCompo";

type RegisterSuccessProps = {
  onLogin: () => void;
};

const RegisterSuccess: React.FC<RegisterSuccessProps> = ({ onLogin }) => {
  return (
    <div className="registerSuccess">
      <div className="registerSuccessCard">
        <h3>Registration Successful</h3>
        <p>
          Your account has been created successfully. Please login with your
          credentials to continue.
        </p>
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
