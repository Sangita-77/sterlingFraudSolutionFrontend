import React from "react";
import CustomForm from "./CustomForm";
import type { FieldConfig } from "./CustomForm";
import mAvtar from "../assets/images/mAvtar.webp";
import { getUserRole, getAuthUser } from "../../../api/authService";

const Profile: React.FC = () => {
  const user = getAuthUser();
  const role = getUserRole(user);

const fields: FieldConfig[] = [
   {
    label: "Gender",
    type: "radio",
    name: "gender",
    placeholder: "",
    width: "full",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  { label: "Full Name", type: "text", name: "firstname", placeholder: "John Doe", width: "full" },
  { label: "Phone Number", type: "tel", name: "phonenumber", placeholder: "+1-234-3456-567" },
  { label: "Mail ID", type: "email", name: "email", placeholder: "john@example.com" },
  { label: "Address", type: "text", name: "address", placeholder: "142 Palm Avenue", width: "full" },
  { label: "City", type: "text", name: "city", placeholder: "Tampa"},
  { label: "State / province/ Region", type: "text", name: "state", placeholder: "FL"},
  { label: "Postal / Zip Code", type: "number", name: "zipcode", placeholder: "FL"},
  { label: "Country", type: "text", name: "country", placeholder: "United States"},
];


  const handleSubmit = (data: Record<string, string>) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Remove confirmPassword before API call
    const { confirmPassword, ...payload } = data;

    console.log("Settings Data:", payload);

    // TODO: Call API here
  };

  return (
    <div className="profileWrap d-flex">
        <div className="ProfilePhoto">
          <img src={mAvtar} alt="Profile Picture" />
          <h3>{role}</h3>
        </div>
        <div className="ProfileForm">  
          <CustomForm fields={fields} onSubmit={handleSubmit} />
        </div>
    </div>
  );
};

export default Profile; 