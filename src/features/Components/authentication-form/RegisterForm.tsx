import React, { useEffect, useState } from "react";
import "../Componets.css";
import Buttons from "../ButtonCompo";
import { BASE_URL } from "../../../api/config";
import { detectLanguageByIP } from "../../../api/languageService";

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
    onSuccess: () => void
}

type FormErrors = Partial<Record<keyof FormData, string>>;

type RegisterApiResponse = {
  success: boolean;
  message?: string;
  detectedLanguage?: string;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  expiresIn?: number;
      data?: {
        _id: string;
        userId: number;
        detectedCountry?: string;
        email: string;
        name: string;
        activity: string;
        flag?: number;
        status?: number;
        sessionId?: string;
        refreshToken?: string;
      };
};

const RegisterForm = ({onClose, clickLogin, onSuccess}: formProps) => {
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
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingCountry, setIsDetectingCountry] = useState(true);

  useEffect(() => {
    const setDetectedCountry = async () => {
      try {
        const detectionResult = await detectLanguageByIP();
        const detectedCountry = detectionResult?.geoData?.country?.trim();

        if (detectedCountry) {
          setFormData((prev) => ({ ...prev, country: detectedCountry }));
          setErrors((prev) => ({ ...prev, country: "" }));
        }
      } catch (error) {
        console.error("Failed to detect country:", error);
      } finally {
        setIsDetectingCountry(false);
      }
    };

    setDetectedCountry();
  }, []);

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
    setSubmitError("");

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const requiredFields: Array<keyof FormData> = [
      "fullName",
      "country",
      "activity",
      "email",
      "password",
      "repeatPassword",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        activity: formData.activity.trim(),
        status: 1,
        country: formData.country.trim(),
        companyName: formData.companyName.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        flag: 2,
      };

      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: RegisterApiResponse = await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(result.message || "Registration failed. Please try again.");
        return;
      }

      if (result.detectedLanguage) {
        localStorage.setItem("selectedLanguage", result.detectedLanguage);
      }
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitError("Something went wrong while creating your account.");
    } finally {
      setIsSubmitting(false);
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
                disabled={isDetectingCountry}
              >
                <option value="">Select your country</option>
                {formData.country && (
                  <option value={formData.country}>{formData.country}</option>
                )}
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
                <option value="AA">AA</option>
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
          {submitError && <p className="error">{submitError}</p>}
            <br />
          <Buttons
            text={isSubmitting ? "SIGNING UP..." : "SIGN UP"}
            variant="primary"
            size="form_side_btn"
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
