import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../api/config";
import { Link } from "react-router-dom";
import { routes } from "../../../Routes/route";
import {
  fetchWithAuth,
  getAuthSession,
  getAuthUser,
  saveAuthUser,
  subscribeToAuthChanges,
} from "../../../api/authService";

type ProfileAvatarProps = {
  label: string;
};

type UserDetailsResponse = {
  success: boolean;
  user?: {
    user?: {
      name?: string;
      profileImage?: {
        url?: string;
      };
      flag?: number;
    };
  };
};

const getProfileImageUrl = (url?: string) => {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${BASE_URL.replace(/\/api$/, "")}${url}`;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ label }) => {
  const [name, setName] = useState(getAuthUser()?.name || label);
  const [imageUrl, setImageUrl] = useState(getAuthUser()?.profileImageUrl || "");
  const [imageFailed, setImageFailed] = useState(false);
  const [flag, setFlag] = useState(getAuthUser()?.flag || "");

  useEffect(() => {
    const syncFromAuth = () => {
      const authUser = getAuthUser();
      setName(authUser?.name || label);
      setImageUrl(authUser?.profileImageUrl || "");
      setImageFailed(false);
      setFlag(authUser?.flag || "");
    };

    const loadProfileImage = async () => {
      const authUser = getAuthUser();
      const session = getAuthSession();
      const userId = authUser?.id || session?.userId;

      if (!userId) {
        syncFromAuth();
        return;
      }

      try {
        const response = await fetchWithAuth(`${BASE_URL}/get-user-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const result: UserDetailsResponse = await response.json();
        const details = result.user?.user;

        // console.log("ProfileAvatar user details response:::::::::::::::::::::::::::", details);

        if (!response.ok || !result.success || !details) {
          syncFromAuth();
          return;
        }

        const nextImageUrl = getProfileImageUrl(details.profileImage?.url);
        const nextName = details.name || authUser?.name || label;
        const flag = details.flag || 0;

        setName(nextName);
        setImageUrl(nextImageUrl);
        setImageFailed(false);
        setFlag(flag);

        if (authUser) {
          saveAuthUser({
            ...authUser,
            name: nextName,
            profileImageUrl: nextImageUrl,
            flag: flag,
          });
        }
      } catch (error) {
        console.error("Navbar profile image error:", error);
        syncFromAuth();
      }
    };

    syncFromAuth();
    loadProfileImage();

    const unsubscribe = subscribeToAuthChanges(syncFromAuth);
    window.addEventListener("storage", syncFromAuth);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", syncFromAuth);
    };
  }, [label]);

  const initial = (name || label || "U").slice(0, 1).toUpperCase();

  const settingsRoute =
  flag === 2
    ? routes.CUSTOMER_SETTINGS
    : flag === 1
    ? routes.AGENT_SETTINGS
    : routes.SETTINGS;

  return (
    <div className="admin-profile">
      <Link to={settingsRoute} className="admin-profile" style={{ textDecoration: "none" }}>
        {imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt={name}
            className="navbar-profile-img"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="navbar-profile-initial" aria-label={name}>
            {initial}
          </div>
        )}
        <span>{name?.trim().split(" ")[0] || label}</span>
      </Link>
    </div>
  );
};

export default ProfileAvatar;
