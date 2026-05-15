import React, { useEffect, useState } from "react";
import DocumentUpdateCard from "../DocumentUpdateCard";
import PassportFrontIcon from "../../assets/images/PassportFrontIcon.svg";
import RejectedIcon from "../../assets/images/RejectedIcon.svg";
import UnderProgress from "../../assets/images/UnderProgress.svg";
import VarifiedIcon from "../../assets/images/VarifiedIcon.svg";
import { Heading2, UnorderedList } from "../../GlobalComponents/HeadingPara";
import Loader from "../../GlobalComponents/Loaders";

import { BASE_URL } from "../../../../api/config";

import {
  fetchWithAuth,
  getAuthSession,
  getAuthUser,
} from "../../../../api/authService";

// type DocumentItem = {
//   _id: string;
//   documentType: string;
//   status: number;
// };

type DocumentItem = {
  _id: string;
  documentType: string;
  status: number;
  filePath?: string;
  fileName?: string;
};

const PassportUpdate: React.FC = () => {
  const user = getAuthUser();
  const session = getAuthSession();

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const userId = user?.id || session?.userId;

    if (!userId) return;

    setLoading(true);

    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/get-documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        return;
      }

      setDocuments(result.documents?.documents || []);
    } catch (error) {
      console.error("Fetch documents error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVariantByStatus = (
    documentType: string
  ):
    | "purple"
    | "green"
    | "orange"
    | "red" => {
    const document = documents.find(
      (doc) => doc.documentType === documentType
    );

    if (!document) {
      return "purple";
    }

    if (document.status === 0) {
      return "orange";
    }

    if (document.status === 1) {
      return "green";
    }

    if (document.status === 2) {
      return "red";
    }

    return "purple";
  };
  const getDocumentId = (
    documentType: string
  ) => {
    const document = documents.find(
      (doc) => doc.documentType === documentType
    );

    return document?._id || "";
  };

  const getDocumentUrl = (
    documentType: string
  ) => {
    const document = documents.find(
      (doc) => doc.documentType === documentType
    );

    if (!document?.filePath) return "";

    return `${BASE_URL.replace(
      /\/api$/,
      ""
    )}/uploads/documents/${document.fileName}`;
  };

  const getIconByStatus = (
    documentType: string
  ) => {
    const document = documents.find(
      (doc) => doc.documentType === documentType
    );

    // default
    if (!document) {
      return PassportFrontIcon;
    }

    // pending
    if (document.status === 0) {
      return UnderProgress;
    }

    // approved
    if (document.status === 1) {
      return VarifiedIcon;
    }

    // rejected
    if (document.status === 2) {
      return RejectedIcon;
    }

    return PassportFrontIcon;
  };

  const getDocumentStatus = (
    documentType: string
  ) => {
    const document = documents.find(
      (doc) => doc.documentType === documentType
    );

    return document?.status;
  };

  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
    <Heading2 text="To avoid delays when verifying your account please observe below:"/>
      <UnorderedList
        items={[
            {text:"Chosen documents must not be expired.",},
            {text:"Documents should be in good condition and clearly visible.",},
            {text:"Make sure that there is no light glare on the document.",},
        ]}
    />

    <div className="PassportUpdate UpdatedocumentsWarp">

    <DocumentUpdateCard
      icon={getIconByStatus("passport_front")}
      text="Front side of your Passport"
      buttonText={loading ? "Loading..." : "Update"}
      documentType="passport_front"
      documentId={getDocumentId("passport_front")}
      documentUrl={getDocumentUrl("passport_front")}
      variant={getVariantByStatus("passport_front")}
      status={getDocumentStatus("passport_front")}
      onUploadSuccess={fetchDocuments}
    />

    <DocumentUpdateCard
      icon={getIconByStatus("passport_back")}
      text="Back side of your Passport"
      buttonText={loading ? "Loading..." : "Update"}
      documentType="passport_back"
      documentId={getDocumentId("passport_back")}
      documentUrl={getDocumentUrl("passport_back")}
      variant={getVariantByStatus("passport_back")}
      status={getDocumentStatus("passport_back")}
      onUploadSuccess={fetchDocuments}
    />

    <DocumentUpdateCard
      icon={getIconByStatus("passport_selfie")}
      text="Selfie with your Passport"
      buttonText={loading ? "Loading..." : "Update"}
      documentType="passport_selfie"
      documentId={getDocumentId("passport_selfie")}
      documentUrl={getDocumentUrl("passport_selfie")}
      variant={getVariantByStatus("passport_selfie")}
      status={getDocumentStatus("passport_selfie")}
      onUploadSuccess={fetchDocuments}
          />
        </div>
      </>
    )}
  </>
);
};

export default PassportUpdate;