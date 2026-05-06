import React from "react";
import PasswordInput from "../../Components/PasswordInput";

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  width?: "full" | "half";
  placehoder?: string;
  options?: { label: string; value: string }[];
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placehoder,
  type,
  name,
  value,
  error,
  width = "half",
  options,
  onChange,
}) => {
  return (
    <div className={width}>
      <label>{label}</label>

      {/* RADIO SUPPORT */}
      {type === "radio" && options ? (
        <div>
          {options.map((opt) => (
            <label key={opt.value} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
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
      )}

      {error && <span className="error">{error}</span>}

    </div>
  );
};

export default FormInput;
