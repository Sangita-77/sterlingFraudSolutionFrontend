import React, { useState } from "react";
// import "./IndexComponents.css";

type FormData = {
  fullName: string;
  company: string;
  phone: string;
  country: string;
  activity: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm = () => {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    company: "",
    phone: "",
    country: "",
    activity: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";

    if (!form.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit phone number";
    }

    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.activity.trim()) newErrors.activity = "Activity is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.repeatPassword) {
      newErrors.repeatPassword = "Repeat your password";
    } else if (form.password !== form.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Submitted:", form);
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">

  <div className="form-group">
    <label htmlFor="fullName">Full Name*</label>
    <input
      id="fullName"
      name="fullName"
      placeholder="Enter your full name"
      onChange={handleChange}
    />
    <p className="error">{errors.fullName}</p>
  </div>

  <div className="form-group">
    <label htmlFor="company">Company name</label>
    <input
      id="company"
      name="company"
      placeholder="Enter your company name"
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label htmlFor="phone">Phone Number</label>
    <input
      id="phone"
      name="phone"
      placeholder="Enter 10-digit phone number"
      onChange={handleChange}
    />
    <p className="error">{errors.phone}</p>
  </div>

  <div className="form-group">
    <label htmlFor="country">Country</label>
      <input
      id="country"
      name="country"
      placeholder="Enter your country"
      onChange={handleChange}
      />
      <select id="country" name="country">
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
      </select>
    <p className="error">{errors.country}</p>
  </div>

  <div className="form-group">
    <label htmlFor="activity">Activity</label>
    <input
      id="activity"
      name="activity"
      placeholder="What do you do?"
      onChange={handleChange}
    />
    <p className="error">{errors.activity}</p>
  </div>

  <div className="form-group">
    <label htmlFor="email">Email Address</label>
    <input
      id="email"
      name="email"
      placeholder="Enter your email"
      onChange={handleChange}
    />
    <p className="error">{errors.email}</p>
  </div>

  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Enter password (min 6 characters)"
      onChange={handleChange}
    />
    <p className="error">{errors.password}</p>
  </div>

  <div className="form-group">
    <label htmlFor="repeatPassword">Repeat Password</label>
    <input
      type="password"
      id="repeatPassword"
      name="repeatPassword"
      placeholder="Re-enter your password"
      onChange={handleChange}
    />
    <p className="error">{errors.repeatPassword}</p>
  </div>

  <button type="submit">Submit</button>
</form>
  );
};

export default RegisterForm;