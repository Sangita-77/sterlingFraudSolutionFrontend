import React, { useEffect, useState } from "react";
import DocumentUpdateCard from "../DocumentUpdateCard";
import PassportFrontIcon from "../../assets/images/PassportFrontIcon.svg";

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

  return (
    <div className="PassportUpdate UpdatedocumentsWarp">

    <DocumentUpdateCard
      icon={PassportFrontIcon}
      text="Front side of your Passport"
      buttonText={loading ? "Loading..." : "Update"}
      documentType="passport_front"
      documentId={getDocumentId("passport_front")}
      documentUrl={getDocumentUrl("passport_front")}
      variant={getVariantByStatus("passport_front")}
    />

    <DocumentUpdateCard
      icon={PassportFrontIcon}
      text="Back side of your Passport"
      buttonText={loading ? "Loading..." : "Update"}
      documentType="passport_back"
      documentId={getDocumentId("passport_back")}
      documentUrl={getDocumentUrl("passport_back")}
      variant={getVariantByStatus("passport_back")}
    />

    <DocumentUpdateCard
      icon={PassportFrontIcon}
      text="Selfie with your Passport"
      buttonText={loading ? "Loading..." : "Update"}
      documentType="passport_selfie"
      documentId={getDocumentId("passport_selfie")}
      documentUrl={getDocumentUrl("passport_selfie")}
      variant={getVariantByStatus("passport_selfie")}
    />

    </div>
  );
};

export default PassportUpdate;