import React, { useEffect, useMemo, useState } from "react";
import CustomForm from "./CustomForm";
import type { FieldConfig, FormValue } from "./CustomForm";
import mAvtar from "../assets/images/mAvtar.webp";
import { BASE_URL } from "../../../api/config";
import { fetchWithAuth, getAuthSession, getUserRole, getAuthUser } from "../../../api/authService";
import GlobalButtons from "../GlobalComponents/GlobalButtons";

type UserDetails = {
  _id?: string;
  name?: string;
  email?: string;
  flag?: number;
  status?: number;
  language?: string;
  company_name?: string;
  phone?: string;
  gender?: string;
  activity?: string;
  userIp?: string;
  detectedCountry?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  lastLogoutAt?: string;
};

type UserDataResponse = {
  success: boolean;
  message?: string;
  user?: {
    user?: UserDetails;
  };
};

const Profile: React.FC = () => {
  const user = getAuthUser();
  const session = getAuthSession();
  const role = getUserRole(user);
  const [profileData, setProfileData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

const fields: FieldConfig[] = useMemo(() => [
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
  { label: "Address", type: "text", name: "address", placeholder: "Enter address", width: "full" },
  { label: "City", type: "text", name: "city", placeholder: "Enter city" },
  { label: "State / province/ Region", type: "text", name: "state", placeholder: "Enter state/province/region" },
  { label: "Postal / Zip Code", type: "number", name: "zipcode", placeholder: "Enter postal/zip code" },
  { label: "Country", type: "text", name: "country", placeholder: "United States"},
], []);

  useEffect(() => {
    const userId = user?.id || session?.userId;

    if (!userId) {
      setProfileError("User id not found. Please login again.");
      return;
    }

    const fetchUserDetails = async () => {
      setIsLoading(true);
      setProfileError("");

      try {
        const response = await fetchWithAuth(`${BASE_URL}/get-user-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const result: UserDataResponse = await response.json();
        const details = result.user?.user;

        if (!response.ok || !result.success || !details) {
          setProfileError(result.message || "Unable to load profile details.");
          return;
        }

        setProfileData({
          gender: details.gender || "",
          firstname: details.name || "",
          phonenumber: details.phone || "",
          email: details.email || "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
          country: details.detectedCountry || "",
        });
      } catch (error) {
        console.error("Profile details error:", error);
        setProfileError("Something went wrong while loading profile details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [session?.userId, user?.id]);


  const handleSubmit = (data: Record<string, FormValue>) => {
    console.log("Profile Data:", data);
  };

  return (
    <div className="profileWrap">
        <div className="ProfileForm gradientBox">  
          <div className="RoleWrap d-flex">
            <h3>{role}</h3>
            <GlobalButtons text="Reset Password"/>
          </div>
          {isLoading && <p className="profile-message">Loading profile details...</p>}
          {profileError && <p className="error">{profileError}</p>}
          <CustomForm fields={fields} initialValues={profileData} onSubmit={handleSubmit} SubmitText="Save Changes" variant="view"/>
        </div>
    </div>
  );
};

export default Profile; 
