import React, { useState } from "react";

type PasswordInputProps = {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EyeIcon = ({ isHidden }: { isHidden: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
    {isHidden && <path d="M3 3l18 18" />}
  </svg>
);

const PasswordInput = ({
  name,
  value,
  placeholder,
  onChange,
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input
        type={isVisible ? "text" : "password"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{ paddingRight: "42px" }}
      />
      <button
        type="button"
        aria-label={isVisible ? "Hide password" : "Show password"}
        onClick={() => setIsVisible((prev) => !prev)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "transparent",
          color: "#635C5C",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: 0,
        }}
      >
        <EyeIcon isHidden={!isVisible} />
      </button>
    </div>
  );
};

export default PasswordInput;
