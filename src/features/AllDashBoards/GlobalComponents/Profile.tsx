import React from "react";
import CustomForm from "./CustomForm";
import type { FieldConfig } from "./CustomForm";
import mAvtar from "../assets/images/mAvtar.webp";
import { getUserRole, getAuthUser } from "../../../api/authService";
import GlobalButtons from "../GlobalComponents/GlobalButtons";

const Profile: React.FC = () => {
  const user = getAuthUser();
  const role = getUserRole(user);

const fields: FieldConfig[] = [
  {label: "", type: "file", name: "profileImage", placeholder: "", width:"full", defaultImage:mAvtar},
   {
    label: "Gender",
    type: "radio",
    name: "gender",
    placeholder: "",
    width: "full",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Others", value: "others" },
    ],
  },
  { label: "Full Name", type: "text", name: "firstname", placeholder: "John Doe", width: "full"},
  { label: "Phone Number", type: "tel", name: "phonenumber", placeholder: "+1-234-3456-567" },
  { label: "Mail ID", type: "email", name: "email", placeholder: "john@example.com" },
  { label: "Address", type: "text", name: "address", placeholder: "142 Palm Avenue", width: "full" },
  { label: "City", type: "text", name: "city", placeholder: "Tampa"},
  { label: "State / province/ Region", type: "text", name: "state", placeholder: "FL"},
  { label: "Postal / Zip Code", type: "number", name: "zipcode", placeholder: "FL"},
  { label: "Country", type: "text", name: "country", placeholder: "United States"},
];


  const handleSubmit = (data: Record<string, string>) => {
    // if (data.password !== data.confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }

    // Remove confirmPassword before API call
    const { confirmPassword, ...payload } = data;

    console.log("Settings Data:", payload);

    // TODO: Call API here
  };

  return (
    <div className="profileWrap">
        <div className="ProfileForm">  
          <div className="RoleWrap d-flex">
            <h3>{role}</h3>
            <GlobalButtons text="Reset Password"/>
          </div>
          <CustomForm  fields={fields} onSubmit={handleSubmit} SubmitText="Save Changes" variant="view"/>
        </div>
    </div>
  );
};

export default Profile; 