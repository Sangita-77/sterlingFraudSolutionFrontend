import React, { useEffect, useRef, useState } from "react";
import PencilEdit from "../assets/images/PencilEdit.svg";
import ModalBox from "./GlobalModal";
import ForgetPasswordForm from "../../Components/authentication-form/ForgetPaswordForm";
import "./GlobalComponents.css";
import SendCode from "../../Components/authentication-form/SendCode";
import ResetPasswordForm from "../../Components/authentication-form/ResetPasswordForm";

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => void;
  error?: string;
  options?: { label: string; value: string }[];
  width?: "full" | "half";
  editable?: boolean;
  onEdit?: () => void;
  variant?: "view" | "edit";
  required?: boolean;
  DefaultProfile?: string;
  preview?: string;
  profileInitial?: string;
  resetpasswordbutton?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type,
  name,
  value,
  error,
  width = "half",
  options,
  onChange,
  editable,
  resetpasswordbutton = false,
  onEdit,
  preview,
  required= false,
  DefaultProfile,
  profileInitial = "U",
}) => {
const fileInputRef = useRef<HTMLInputElement>(null);
const [imageFailed, setImageFailed] = useState(false);
const imageSrc = preview || value || DefaultProfile || "";
const [openForgetModal, setOpenForgetModal] = useState(false);
const handleOpenSendCode = (email: string) => {
  setResetEmail(email);

  // close forget password modal
  setOpenForgetModal(false);

  // open verify code modal
  setOpenSendCodeModal(true);
};
const [openSendCodeModal, setOpenSendCodeModal] = useState(false);
const [resetEmail, setResetEmail] = useState("");
const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

useEffect(() => {
  setImageFailed(false);
}, [imageSrc]);

const handleUploadClick = () => {
fileInputRef.current?.click();

};

const renderProfileUpload = () => (
  <div className="profile-upload">
    {imageSrc && !imageFailed ? (
      <img
        src={imageSrc}
        alt="profile"
        className="profile-img"
        referrerPolicy="no-referrer"
        onError={() => setImageFailed(true)}
      />
    ) : (
      <div className="profile-initial" aria-label="profile">
        {profileInitial.slice(0, 1).toUpperCase()}
      </div>
    )}
    <button
      type="button"
      onClick={() => {
        handleUploadClick();
        onEdit?.();
      }}
      className="edit-btn"
    >
      <img src={PencilEdit} alt="edit" />
    </button>

    <input
      ref={fileInputRef}
      type="file"
      name={name}
      accept="image/*"
      onChange={onChange}
      style={{ display: "none" }}
    />
  </div>
);

  return ( 
  type === "file" ? (
   renderProfileUpload()
    ) :
    <div className={width}>
      {label && (
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      {/* RADIO */}
        {type === "radio" && options ? (
          <div className="radioOptions d-flex">
            {options.map((opt) => (
              <label key={opt.value} className="radio-container">
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  disabled={!editable}
                  required={required}
                />
                <span className="checkmark"></span>
                {opt.label}
              </label>
            ))}
          </div>
        ): type === "select" && options ? (

          <div className="input-wrapper">
            <select
              name={name}
              value={value}
              onChange={onChange}
              disabled={!editable}
              required={required}
              className="form-select"
            >
              <option value="">
                {placeholder || "Select option"}
              </option>

              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {!editable && onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="edit-btn"
              >
                <img src={PencilEdit} alt="edit" />
              </button>
            )}
          </div>

        ) : type === "password" ? (
          <div className="password-field-wrap">
            <input
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              disabled={!editable}
            />
            {!resetpasswordbutton &&
              <button
                type="button"
                onClick={() => setOpenForgetModal(true)}
                className="edit-btn"
              >
                Reset Password
              </button>
            }
          </div>
      ) : type === "file" ? (
        renderProfileUpload()
        ) :  (
          <div className="input-wrapper">
            <input
              name={name}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              disabled={!editable}
              required={required}
            />

            {!editable && onEdit && (
              <button type="button" onClick={onEdit} className="edit-btn">
                <img src={PencilEdit} alt="edit" />
              </button>
            )}
          </div>
        )}

      {error && <span className="error">{error}</span>}

   {openForgetModal && (
        <ModalBox
          customeClass="resetPasswordModal"
          header={<h3>Reset Password</h3>}
          body={
            <ForgetPasswordForm
              onClose={() => setOpenForgetModal(false)}
              openSendCode={handleOpenSendCode}
            />
          }
          onCancel={() => setOpenForgetModal(false)}
        />
    )}

    {openSendCodeModal && (
      <ModalBox
        customeClass="resetPasswordModal"
        header={<h3>Verify Code</h3>}
        body={
          // <SendCode
          //   email={resetEmail}
          //   onClose={() => setOpenSendCodeModal(false)}
          //   onSuccess={() => {
          //     setOpenSendCodeModal(false);
          //   }}
          // />

          <SendCode
            email={resetEmail}
            onClose={() => setOpenSendCodeModal(false)}
            onSuccess={() => {
              // close otp modal
              setOpenSendCodeModal(false);

              // open reset password modal
              setOpenResetPasswordModal(true);
            }}
          />
        }
        onCancel={() => setOpenSendCodeModal(false)}
      />
    )}

    {openResetPasswordModal && (
      <ModalBox
        customeClass="resetPasswordModal"
        header={<h3>Reset Password</h3>}
        body={
          <ResetPasswordForm
            email={resetEmail}
            onClose={() =>
              setOpenResetPasswordModal(false)
            }
            onSuccess={() => {
              setOpenResetPasswordModal(false);
            }}
          />
        }
        onCancel={() =>
          setOpenResetPasswordModal(false)
        }
      />
    )}

</div>
    
  );
};

export default FormInput;
