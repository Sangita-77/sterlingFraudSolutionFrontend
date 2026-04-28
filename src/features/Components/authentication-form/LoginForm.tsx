import React, { useState } from 'react'
import "../Componets.css"
import Buttons from '../ButtonCompo'

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

const LoginForm = ({ onClose, clickRegister, openForgetPassword }: LoginProps) => {

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name as keyof FormData, value);
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
    validate("email", formData.email);
    validate("password", formData.password);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validateAllFields
    if (errors.email || errors.password) return
    if (formData.email === "" || formData.password === "") return validateAllFields()

    console.log("Form Data:", formData);
    onClose()

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
          <br />

          <Buttons text="LOGIN" variant="primary" size='full' />
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