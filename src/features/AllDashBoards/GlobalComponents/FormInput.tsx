<<<<<<< HEAD
import React, { useRef } from "react";
import PencilEdit from "../assets/images/PencilEdit.svg";
=======
import React from "react";
import PasswordInput from "../../Components/PasswordInput";
>>>>>>> 72ec7edc5ea9737a7e33fafac171103857b3ee48

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  options?: { label: string; value: string }[];
  width?: "full" | "half";
  editable?: boolean;
  onEdit?: () => void;
  variant?: "view" | "edit";
  required?: boolean;
  DefaultProfile?: string;
  preview?: string;
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
  onEdit,
  preview,
  required= false,
  DefaultProfile,
}) => {
const fileInputRef = useRef<HTMLInputElement>(null);
const handleUploadClick = () => {
fileInputRef.current?.click();

};
  return ( 
  type === "file" ? (
   <div className="profile-upload">
          <img
              src={preview || value || DefaultProfile}
              alt="profile"
              className="profile-img"
            />
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

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              name={name}
              accept="image/*"
              onChange={onChange}
              style={{ display: "none" }}
            />
        </div>
<<<<<<< HEAD
    ) :
    <div className={width}>
      {label && (
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
=======
      ) : type === "password" ? (
        <PasswordInput
          name={name}
          value={value}
          placeholder={placehoder}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placehoder}
          onChange={onChange}
        />
>>>>>>> 72ec7edc5ea9737a7e33fafac171103857b3ee48
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
        ) : type === "file" ? (
        <div className="profile-upload">
            <img
              src={preview || value || DefaultProfile}
              alt="profile"
              className="profile-img"
            />
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

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              name={name}
              accept="image/*"
              onChange={onChange}
              style={{ display: "none" }}
            />
        </div>
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
    </div>
  );
};

export default FormInput;
