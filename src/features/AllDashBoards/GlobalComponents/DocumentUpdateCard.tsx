import React, { useRef, useState } from "react";
import "./GlobalComponents.css";
import { BASE_URL } from "../../../api/config";
import {
  fetchWithAuth,
  getAuthSession,
  getAuthUser,
} from "../../../api/authService";
import {EyeIcon} from 'lucide-animated';
import Tooltip from "./ToolTip";

// type CardVariant = "purple" | "green" | "orange";

type CardVariant =
  | "purple"
  | "green"
  | "orange"
  | "red";

// interface CardProps {
//   icon: string;
//   text: string;
//   buttonText: string;
//   variant?: CardVariant;
//   documentType: string;
//   onFileSelect?: (file: File) => void;
// }

// interface CardProps {
//   icon: string;
//   text: string;
//   buttonText: string;
//   variant?: CardVariant;
//   documentType: string;
//   documentId?: string;
//   onFileSelect?: (file: File) => void;
// }

// interface CardProps {
//   icon: string;
//   text: string;
//   buttonText: string;
//   variant?: CardVariant;
//   documentType: string;
//   documentId?: string;
//   documentUrl?: string;
//   onFileSelect?: (file: File) => void;
// }

interface CardProps {
  icon: string;
  text: string;
  buttonText: string;
  variant?: CardVariant;
  documentType: string;
  documentId?: string;
  documentUrl?: string;
  status?: number;
  onFileSelect?: (file: File) => void;
}

const IconTextButtonCard: React.FC<CardProps> = ({
  icon,
  text,
  buttonText,
  variant = "purple",
  documentType,
  documentId,
  documentUrl,
  status,
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = getAuthUser();
  const session = getAuthSession();

  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };


  const handleDocumentUpload = async (file: File) => {
    const userId = user?.id || session?.userId;

    if (!userId) {
      setUploadError("User id not found. Please login again.");
      return;
    }

    setIsSaving(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const payload = new FormData();

      payload.append("userId", userId);
      payload.append("documentType", documentType);
      payload.append("file", file);

      let apiUrl = `${BASE_URL}/upload-document`;

      // if document already exists -> update
      if (documentId) {
        apiUrl = `${BASE_URL}/update-documents`;

        payload.append("id", documentId);
        payload.append("status", "0");
      }

      const response = await fetchWithAuth(apiUrl, {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setUploadError(
          result.message || "Unable to upload document."
        );
        return;
      }

      console.log("Document Upload Success:", result);

      setUploadSuccess(
        documentId
          ? "Document updated successfully."
          : "Document uploaded successfully."
      );
      window.location.reload();

      if (onFileSelect) {
        onFileSelect(file);
      }
    } catch (error) {
      console.error("Document upload error:", error);

      setUploadError(
        "Something went wrong while uploading document."
      );
    } finally {
      setIsSaving(false);
    }
  };
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    await handleDocumentUpload(file);
  };


  // Drag Events
  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    await handleDocumentUpload(file);
  };

  // const getStatusText = () => {
  //   console.log("Document Status:", status);
  //   if (status === 0) {
  //     return "Under Progress";
  //   }

  //   if (status === 1) {
  //     return "Verified";
  //   }

  //   if (status === 2) {
  //     return "Rejected";
  //   }

  //   return "Not Uploaded";
  // };


  return (
    
    <div
      className={`DocumentUpdate-card ${variant} ${
        isDragging ? "dragging" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="icon-card-content">
        <img
          src={icon}
          alt="icon"
          className="icon-card-image"
        />
        {/* <p className="document-status-text">
          {getStatusText()}
        </p> */}

        <p className="icon-card-text">{text}</p>

        {uploadError && (
          <p className="error">{uploadError}</p>
        )}

        {documentUrl && (
          <div className="document-preview-wrap">
          <Tooltip text="Preview Document" position="top">
            <button
              type="button"
              className="document-preview-btn"
              onClick={() => window.open(documentUrl, "_blank")}
            >
              <EyeIcon />
            </button>
          </Tooltip>
          </div>
        )}

        {uploadSuccess && (
          <p className="profile-message">
            {uploadSuccess}
          </p>
        )}

        {/* <button
          type="button"
          className="icon-card-button"
          onClick={handleButtonClick}
          disabled={isSaving}
        >
          {isSaving ? "Uploading..." : buttonText}
        </button> */}

        <button
          type="button"
          className="icon-card-button"
          onClick={handleButtonClick}
          disabled={isSaving || status === 1}
        >
          {isSaving
            ? "Uploading..."
            : status === 1
            ? "Verified"
            : status === 2
            ? "Rejected"
            : status === 0 ? "Under Progress" : buttonText}
        </button>

        {/* <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        /> */}

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default IconTextButtonCard;