import React, { useState } from "react";
import "../IndexComponents.css";
import Buttons from "../ButtonCompo";
import PasswordInput from "../PasswordInput";
import { BASE_URL } from "../../../api/config";

type Props = {
  email: string;
  onClose: () => void;
  onSuccess: () => void;
};

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type ResetPasswordApiResponse = {
  success: boolean;
  message?: string;
};

const ResetPasswordForm = ({ email, onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name: keyof FormData, value: string) => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required";
    } else if (name === "newPassword" && value.length < 6) {
      error = "Password must be at least 6 characters";
    } else if (name === "confirmPassword" && value !== formData.newPassword) {
      error = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);

    validate(name as keyof FormData, value);

    setSubmitError("");

    if (
      name === "newPassword" &&
      nextFormData.confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          nextFormData.confirmPassword === value
            ? ""
            : "Passwords do not match",
      }));
    }
  };

  const validateAllFields = () => {
    const newErrors: FormErrors = {};

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "This field is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "This field is required";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateAllFields()) return;

    if (!email) {
      setSubmitError(
        "Email is missing. Please request a new code."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        `${BASE_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword: formData.newPassword,
            confirmPassword:
              formData.confirmPassword,
          }),
        }
      );

      const result: ResetPasswordApiResponse =
        await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(
          result.message ||
            "Unable to reset password."
        );
        return;
      }

      onClose();
      onSuccess();
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setSubmitError(
        "Something went wrong while resetting your password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <span className="disclamer-login">
        Create a new password for your account
      </span>

      <div className="formContainer login-form">
        {/* <form onSubmit={handleSubmit}> */}
        <div className="resetPasswordFormWrap">
          <div className="full-width">
            <label>New Password*</label>
            <PasswordInput
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter New Password"
            />
            {errors.newPassword && <p className="error">{errors.newPassword}</p>}
          </div>

          <div className="full-width">
            <label>Confirm Password*</label>
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          {submitError && <p className="error">{submitError}</p>}
          <br />

          {/* <Buttons
            text={isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
            variant="primary"
            size="full"
            type="submit"
            disabled={isSubmitting}
          /> */}

          <Buttons
            text={
              isSubmitting
                ? "RESETTING..."
                : "RESET PASSWORD"
            }
            variant="primary"
            size="full"
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
          />
          </div>
        {/* </form> */}
      </div>
    </>
  );
};

export default ResetPasswordForm;
