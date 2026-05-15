import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import CustomForm from "../../CustomForm";
import type { FieldConfig, FormValue } from "../../CustomForm";
import {Heading2, Heading1, Paragraph2, UnorderedList, Heading3} from "../../HeadingPara";
import { MailCheckIcon} from 'lucide-animated';
import { BASE_URL } from "../../../../../api/config";
import { fetchWithAuth } from "../../../../../api/authService";
import Loader from "../../Loaders";

type ProfileImage = {
  url?: string;
};

type CustomerDetails = {
  profileImage?: ProfileImage;
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  zipcode?: string;
  detectedCountry?: string;
  userStatus?: number;
  status?: number;
};

type UserDataResponse = {
  success: boolean;
  message?: string;
  user?: CustomerDetails | { user?: CustomerDetails };
};

type UpdateUserResponse = {
  success: boolean;
  message?: string;
  user?: CustomerDetails | { user?: CustomerDetails };
};

type NestedCustomerDetails = {
  user?: CustomerDetails;
};

const getCustomerDetails = (user: UserDataResponse["user"] | UpdateUserResponse["user"]) => {
  if (!user) return undefined;

  if ("user" in user && typeof (user as NestedCustomerDetails).user === "object") {
    return (user as NestedCustomerDetails).user;
  }

  return user as CustomerDetails;
};

const getProfileImageUrl = (url?: string) => {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${BASE_URL.replace(/\/api$/, "")}${url}`;
};

const CustomerDetailsProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [profileData, setProfileData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const fields: FieldConfig[] = useMemo(
    () => [
      { label: "Address", type: "text", name: "address", placeholder: "Enter address", width: "full", },
      { label: "City", type: "text", name: "city", placeholder: "Enter city", },
      { label: "State / province / Region", type: "text", name: "state", placeholder: "Enter state/province/region", },
      { label: "Postal / Zip Code", type: "number", name: "zipcode", placeholder: "Enter postal/zip code", },
      { label: "Country", type: "text", name: "country", placeholder: "United States", },
    ],
    []
  );

  useEffect(() => {
    if (!id) {
      setProfileError("Customer id not found in URL.");
      return;
    }

    const fetchCustomerDetails = async () => {
      setIsLoading(true);
      setProfileError("");

      try {
        const response = await fetchWithAuth(`${BASE_URL}/get-user-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: id }),
        });

        const result: UserDataResponse = await response.json();
        const details = getCustomerDetails(result.user);

        if (!response.ok || !result.success || !details) {
          setProfileError(result.message || "Unable to load customer details.");
          return;
        }

        setCustomer(details);
        setProfileData({
          address: details.address || "",
          city: details.city || "",
          state: details.state || "",
          zipcode: details.zip || details.zipcode || "",
          country: details.detectedCountry || "",
        });
      } catch (error) {
        console.error("Customer details error:", error);
        setProfileError("Something went wrong while loading customer details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const profileImageUrl = getProfileImageUrl(customer?.profileImage?.url);
  const customerInitial = (customer?.name || customer?.email || "C").slice(0, 1).toUpperCase();

  useEffect(() => {
    setImageFailed(false);
  }, [profileImageUrl]);

  const getStringValue = (value: FormValue | undefined): string => {
    return typeof value === "string" ? value : "";
  };

  const handleSubmit = async (data: Record<string, FormValue>) => {
    if (!id) {
      setProfileError("Customer id not found in URL.");
      return;
    }

    setIsSaving(true);
    setProfileError("");
    setProfileSuccess("");

    try {
      const payload = new FormData();
      payload.append("userId", id);
      payload.append("name", customer?.name || "");
      payload.append("phone", customer?.phone || "");
      payload.append("address", getStringValue(data.address));
      payload.append("city", getStringValue(data.city));
      payload.append("state", getStringValue(data.state));
      payload.append("zip", getStringValue(data.zipcode));

      const response = await fetchWithAuth(`${BASE_URL}/update-user`, {
        method: "PUT",
        body: payload,
      });

      const result: UpdateUserResponse = await response.json();

      if (!response.ok || !result.success) {
        setProfileError(result.message || "Unable to update customer details.");
        return;
      }

      const updatedDetails = getCustomerDetails(result.user);

      setCustomer((prev) => ({
        ...(prev || {}),
        ...(updatedDetails || {}),
        address: getStringValue(data.address),
        city: getStringValue(data.city),
        state: getStringValue(data.state),
        zip: getStringValue(data.zipcode),
      }));
      setProfileData((prev) => ({
        ...prev,
        address: getStringValue(data.address),
        city: getStringValue(data.city),
        state: getStringValue(data.state),
        zipcode: getStringValue(data.zipcode),
      }));
      // setProfileSuccess(result.message || "Customer details updated successfully.");
    } catch (error) {
      console.error("Customer update error:", error);
      setProfileError("Something went wrong while updating customer details.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
    <div className="d-flex CustomerDetailsWrap">
        <div className="CustomerDetailsProfile">
          <div className="ProfileImage">
            {profileImageUrl && !imageFailed ? (
              <img
                src={profileImageUrl}
                alt={customer?.name || "Customer"}
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="profile-initial" aria-label={customer?.name || "Customer"}>
                {customerInitial}
              </div>
            )}
            {(customer?.userStatus === 1 || customer?.status === 1) && <div className="activeStatus"></div>}
          </div>  
          <Heading1 text={customer?.name || "Customer"}/>
          <Paragraph2 text="Customer"/>
            <UnorderedList
            variant="icon"
            items={[
                {
                text: customer?.email || "-",
                icon: <MailCheckIcon/>
                },
                {
                text: customer?.phone || "-",
                icon: <MailCheckIcon/>
                },
            ]}
            />
                        
        </div>
        <div className="CustomerDetailsFormWrap">
            <div className="ProfileForm CustomerDetailsForm">
                <Heading2 text="Personal Information"/>
                  {profileError && <p className="error">{profileError}</p>}
                  {profileSuccess && <p className="profile-message">{profileSuccess}</p>}
                  <CustomForm
                      fields={fields}
                      initialValues={profileData}
                      variant="view"
                      onSubmit={handleSubmit}
                      SubmitText={isSaving ? "Saving..." : "Save Changes"}
                      isSubmitting={isSaving}
                  />
                  <div className="gradientBox">
                    <Heading3 text="Case Information"/>
                    <Paragraph2 text="The customer reported unauthorized cryptocurrency withdrawals from their account. The transactions were not initiated by the user and are suspected to be the result of compromised login credentials or phishing activity. Immediate investigation is required to trace the funds and secure the account."/>
                  </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default CustomerDetailsProfile;
