import React, { useState } from "react";
import "../IndexComponents.css";
import Buttons from "../ButtonCompo";

type FormData = {
  fullName: string;
  companyName: string;
  phone: string;
  country: string;
  activity: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type formProps ={
    onClose: () => void
    clickLogin: () => void
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const RegisterForm = ({onClose, clickLogin}: formProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    phone: "",
    country: "",
    activity: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (name: keyof FormData, value: string) => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required";
    } else {
      switch (name) {
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) {
            error = "Invalid email format";
          }
          break;
        case "password":
          if (value.length < 6) {
            error = "Password must be at least 6 characters";
          }
          break;
        case "repeatPassword":
          if (value !== formData.password) {
            error = "Passwords do not match";
          }
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    validate(name as keyof FormData, value);

  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let newErrors: FormErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof FormData] = "This field is required";
      }
    });

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Data:", formData);
      onClose()
    }
    
  };

  const redirectToLogin = () => {
    onClose()
    clickLogin()
  }

  return (
    <>
      <span className="disclamer-reg">
        Already have an account? <span className="link" onClick={redirectToLogin}>Login</span>
      </span>
      <br />
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="full-width">
            <label>Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Name Surmane"
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          {/* Company + Phone */}
          <div className="row">
            <div>
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"

              />
             
            </div>

            <div>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* Country + Activity */}
          <div className="row">
            <div>
              <label>Country*</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select your country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
              {errors.country && <p className="error">{errors.country}</p>}
            </div>

            <div>
              <label>Activity*</label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
              >
                <option value="">Select your activity</option>
                <option value="Business">Business</option>
                <option value="Example">Example</option>
              </select>
              {errors.activity && <p className="error">{errors.activity}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="full-width">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Passwords */}
          <div className="row">
            <div>
              <label>Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="************"

              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div>
              <label>Repeat Password*</label>
              <input
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="************"
              />
              {errors.repeatPassword && (
                <p className="error">{errors.repeatPassword}</p>
              )}
            </div>
          </div>
            <br />
          <Buttons text="SIGN UP" variant="primary" size="form_side_btn" />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;