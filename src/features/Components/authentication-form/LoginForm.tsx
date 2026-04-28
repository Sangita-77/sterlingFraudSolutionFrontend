import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../Componets.css"
import Buttons from '../ButtonCompo'
import { BASE_URL } from "../../../api/config";
import {
  getAuthorizedLandingRoute,
  saveAuthSession,
  saveAuthUser,
} from "../../../api/authService";

type LoginProps = {
  onClose: () => void
  clickRegister: () => void
  openForgetPassword: () => void
}
type FormData = {
  email: string
  password: string
}

type FormErrors = Partial<Record<keyof FormData, string>>;

type LoginApiResponse = {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  expiresIn?: number;
  userLanguage?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    flag: number;
    status: number;
  };
};

const LoginForm = ({ onClose, clickRegister, openForgetPassword }: LoginProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name as keyof FormData, value);
    setSubmitError("");
  };

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
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAllFields = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAllFields()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const result: LoginApiResponse = await response.json();

      if (!response.ok || !result.success || !result.user) {
        setSubmitError(result.message || "Login failed. Please try again.");
        return;
      }

      saveAuthUser(result.user);

      if (result.userLanguage) {
        localStorage.setItem("selectedLanguage", result.userLanguage);
      }

      if (result.accessToken && result.refreshToken && result.sessionId) {
        saveAuthSession({
          userId: result.user.id,
          sessionId: result.sessionId,
          refreshToken: result.refreshToken,
          accessToken: result.accessToken,
          expiresAt: result.expiresIn
            ? Date.now() + result.expiresIn * 1000
            : undefined,
        });
      }

      onClose();
      const redirectPath = getAuthorizedLandingRoute(result.user);

      if (redirectPath) {
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Login error:", error);
      setSubmitError("Something went wrong while logging in.");
    } finally {
      setIsSubmitting(false);
    }

  };



  const redirectToRegister = () => {
    onClose()
    clickRegister()
  }

  const handleForgetPassword = () => {
    onClose()
    openForgetPassword()
  }

  return (
    <>
      <span className='disclamer-login'>
        Don't have an account? <span className="link" onClick={redirectToRegister}>Register</span>
      </span>

      <div className="formContainer login-form">
        <form onSubmit={handleSubmit}>
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

          {/* Password */}
          <div className="full-width">
            <label>Password*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {submitError && <p className="error">{submitError}</p>}
          <br />

          <Buttons
            text={isSubmitting ? "LOGGING IN..." : "LOGIN"}
            variant="primary"
            size='full'
            type="submit"
            disabled={isSubmitting}
          />
        </form>
        <div className="needHelp">
          <a href="mailto:info@sterlingfraudsolution.com" className='link-login'>Need Help ?</a>
          <samp className='link-login' onClick={handleForgetPassword} >Forgot Password?</samp>
        </div>
      </div>

    </>
  )
}

export default LoginForm
