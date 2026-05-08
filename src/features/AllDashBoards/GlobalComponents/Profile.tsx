import React, { useEffect, useMemo, useState } from "react";
import CustomForm from "./CustomForm";
import type { FieldConfig, FormValue } from "./CustomForm";
import { BASE_URL } from "../../../api/config";
import { fetchWithAuth, getAuthSession, getUserRole, getAuthUser, saveAuthUser } from "../../../api/authService";
import GlobalButtons from "../GlobalComponents/GlobalButtons";
import ForgetPasswordForm from "../../Components/authentication-form/ForgetPaswordForm";
import ResetPassword from "./GlobalModal";

type UserDetails = {
  profileImage?: {
    url?: string;
  };
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
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
};

type UserDataResponse = {
  success: boolean;
  message?: string;
  user?: {
    user?: UserDetails;
  };
};

type UpdateUserResponse = {
  success: boolean;
  message?: string;
  user?: {
    user?: UserDetails;
  };
};

const getProfileImageUrl = (url?: string) => {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${BASE_URL.replace(/\/api$/, "")}${url}`;
};

const Profile: React.FC = () => {
  const user = getAuthUser();
  const session = getAuthSession();
  const role = getUserRole(user);
  const [profileData, setProfileData] = useState<Record<string, string>>({});
  // const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const [openForgetModal, setOpenForgetModal] = useState(false);

  const handleOpenSendCode = (email: string) => {
    console.log(email);
  };

  const fields: FieldConfig[] = useMemo(() => [
    {label: "", type: "file", name: "profileImage", placeholder: "", width:"full"},
    {
      label: "Gender",
      type: "radio",
      name: "gender",
      placeholder: "",
      width: "full",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Others", value: "other" },
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
      // setIsLoading(true);
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
          profileImage: getProfileImageUrl(details.profileImage?.url),
          gender: details.gender || "",
          firstname: details.name || "",
          phonenumber: details.phone || "",
          email: details.email || "",
          address: details.address || "",
          city: details.city || "",
          state: details.state || "",
          zipcode: details.zipcode || "",
          country: details.detectedCountry || "",
        });
      } catch (error) {
        console.error("Profile details error:", error);
        setProfileError("Something went wrong while loading profile details.");
      } finally {
        // setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [session?.userId, user?.id]);


  const getStringValue = (value: FormValue | undefined): string => {
    return typeof value === "string" ? value : "";
  };

  const handleSubmit = async (data: Record<string, FormValue>) => {
    const userId = user?.id || session?.userId;

    if (!userId) {
      setProfileError("User id not found. Please login again.");
      return;
    }

    setIsSaving(true);
    setProfileError("");
    setProfileSuccess("");

    try {
      const payload = new FormData();
      payload.append("userId", userId);
      payload.append("name", getStringValue(data.firstname));
      payload.append("phone", getStringValue(data.phonenumber));
      payload.append("gender", getStringValue(data.gender));
      payload.append("address", getStringValue(data.address));
      payload.append("city", getStringValue(data.city));
      payload.append("state", getStringValue(data.state));
      payload.append("zip", getStringValue(data.zipcode));

      if (data.profileImage instanceof File) {
        payload.append("profileImage", data.profileImage);
      }

      const response = await fetchWithAuth(`${BASE_URL}/update-user`, {
        method: "PUT",
        body: payload,
      });

      const result: UpdateUserResponse = await response.json();

      if (!response.ok || !result.success) {
        setProfileError(result.message || "Unable to update profile details.");
        return;
      }

      const updatedName = getStringValue(data.firstname);
      const updatedProfileImageUrl =
        getProfileImageUrl(result.user?.user?.profileImage?.url) ||
        profileData.profileImage ||
        "";

      if (user && updatedName) {
        saveAuthUser({
          ...user,
          name: updatedName,
          profileImageUrl: updatedProfileImageUrl,
        });
      }

      setProfileData((prev) => ({
        ...prev,
        profileImage: updatedProfileImageUrl || prev.profileImage || "",
        gender: getStringValue(data.gender),
        firstname: updatedName,
        phonenumber: getStringValue(data.phonenumber),
        address: getStringValue(data.address),
        city: getStringValue(data.city),
        state: getStringValue(data.state),
        zipcode: getStringValue(data.zipcode),
      }));
      setProfileSuccess(result.message || "Profile updated successfully.");
      window.location.reload(); // Reload to reflect changes in ProfileAvatar and other components using auth data
    } catch (error) {
      console.error("Profile update error:", error);
      setProfileError("Something went wrong while updating profile details.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
    <div className="profileWrap">
        <div className="ProfileForm gradientBox">  
          <div className="RoleWrap d-flex">
            <h3>{role}</h3>
            <div className="ResetButton">
              <GlobalButtons text="Reset Password" onClick={() => setOpenForgetModal(true)}/>
              </div>
            {/* <GlobalButtons text="Reset Password" onClick={() => setOpenForgetModal(true)}/> */}
                    {/* MODAL */}
                    {/* {openForgetModal && (
                      <div className="modalOverlay">
                        <div className="modalContent">

                          <button
                            className="closeBtn"
                            onClick={() => setOpenForgetModal(false)}
                          >
                            X
                          </button>

                          <ForgetPasswordForm
                            onClose={() => setOpenForgetModal(false)}
                            openSendCode={handleOpenSendCode}
                          />
                        </div>
                      </div>
                    )} */}
          </div>
          {/* {isLoading && <p className="profile-message">Loading profile details...</p>} */}
          {profileError && <p className="error">{profileError}</p>}
          {profileSuccess && <p className="profile-message">{profileSuccess}</p>}
          <CustomForm fields={fields} initialValues={profileData} onSubmit={handleSubmit} SubmitText={isSaving ? "Saving..." : "Save Changes"} isSubmitting={isSaving} variant="view"/>
        </div>
    </div>


{openForgetModal && (
  <ResetPassword
    customeClass="resetPasswordModal"
    header={<h3>Reset Password</h3>}
    body={
      <ForgetPasswordForm
        onClose={() => setOpenForgetModal(false)}
        openSendCode={handleOpenSendCode}
      />
    }
    onCancel={() => setOpenForgetModal(false)}
  />
)}
    </>
  );
  
};





export default Profile; 
