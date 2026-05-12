export const passwordRequirementMessage =
  "Password must be at least 6 characters and include uppercase, lowercase, number, and special character";

export const getPasswordValidationError = (password: string) => {
  if (password.length < 6) {
    return passwordRequirementMessage;
  }

  if (!/[A-Z]/.test(password)) {
    return passwordRequirementMessage;
  }

  if (!/[a-z]/.test(password)) {
    return passwordRequirementMessage;
  }

  if (!/[0-9]/.test(password)) {
    return passwordRequirementMessage;
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return passwordRequirementMessage;
  }

  return "";
};
