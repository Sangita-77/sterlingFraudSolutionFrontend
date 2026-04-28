import React from "react";
import "./IndexComponents.css";
import leftImage from "../../assets/images/authentication-left-image.svg";
import X from "../../assets/images/X.svg"

type ModalProps = {
  isOpen: boolean | void;
  onClose: () => void;
  title: string;
  titleSize?: "register-title" | "login-title" | "forgetPassword-title" | "sendCode-title";
  buttonName?: string;
  formComponents?: React.ReactNode;
  size: "register" | "login" | "forgetPassword" | "sendCode";
  imageSize?: "register-left-image" | "login-left-image" | "forgetPassword-left-image" | "sendCode-left-image";
  spaceInput?: "register-space" | "login-space" | "forgetPassword-space" | "sendCode-space";
  formSize?: "register-form" | "login-form" | "forgetPassword-form" | "sendCode-form";

};

const AuthenticationModel = ({
  isOpen,
  onClose,
  title,
  formComponents,
  size,
  titleSize,
  imageSize,
  spaceInput,
  formSize

}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="authModal">
      <div className="modalOverlay">
        <div className={`modalContainer ${size}`}>

          {/* LEFT SIDE */}
          <div className={`modalLeft ${imageSize}`}>
            <img src={leftImage} alt="modal visual" className="modalImage" />
            <h2>Investigate with starling</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
          </div>

          {/* RIGHT SIDE */}
          <div className={`modalRight ${spaceInput} ${formSize}`}>
            <div>
              <div className={`modalHeader ${titleSize}`}>
                <h2>{title}</h2>
                <button className="closeBtn" onClick={onClose}>
                  <img src={X} />
                </button>
              </div>

              <div className="modalBody">{formComponents}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModel;