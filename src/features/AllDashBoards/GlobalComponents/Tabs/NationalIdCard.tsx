import React, { useEffect, useState } from "react";
import DocumentUpdateCard from "../DocumentUpdateCard";

import PassportFrontIcon from "../../assets/images/PassportFrontIcon.svg";
import VarifiedIcon from "../../assets/images/VarifiedIcon.svg";
import UnderProgress from "../../assets/images/UnderProgress.svg";
import RejectedIcon from "../../assets/images/RejectedIcon.svg";
import { Heading2, UnorderedList } from "../../GlobalComponents/HeadingPara";
import Loader from "../../GlobalComponents/Loaders";

import { BASE_URL } from "../../../../api/config";

import {
  fetchWithAuth,
  getAuthSession,
  getAuthUser,
} from "../../../../api/authService";

type DocumentItem = {
  _id: string;
  documentType: string;
  status: number;
  filePath?: string;
  fileName?: string;
};

const NationalIdUpdate: React.FC = () => {
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

    if (!document?.fileName) return "";

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
            "Chosen documents must not be expired.",
            "Documents should be in good condition and clearly visible.",
            "Make sure that there is no light glare on the document.",
          ]}
          />
    <div className="PassportUpdate UpdatedocumentsWarp">

      <DocumentUpdateCard
        icon={getIconByStatus("national_id_front")}
        text="Front side of your National ID"
        buttonText={
          loading ? "Loading..." : "Update"
        }
        documentType="national_id_front"
        documentId={getDocumentId(
          "national_id_front"
        )}
        documentUrl={getDocumentUrl(
          "national_id_front"
        )}
        variant={getVariantByStatus(
          "national_id_front"
        )}
        status={getDocumentStatus("national_id_front")}
        onUploadSuccess={fetchDocuments}
      />

      <DocumentUpdateCard
        icon={getIconByStatus("national_id_back")}
        text="Back side of your National ID"
        buttonText={
          loading ? "Loading..." : "Update"
        }
        documentType="national_id_back"
        documentId={getDocumentId(
          "national_id_back"
        )}
        documentUrl={getDocumentUrl(
          "national_id_back"
        )}
        variant={getVariantByStatus(
          "national_id_back"
        )}
        status={getDocumentStatus("national_id_back")}
        onUploadSuccess={fetchDocuments}
      />

      <DocumentUpdateCard
        icon={getIconByStatus("national_id_selfie")}
        text="Selfie with your National ID"
        buttonText={
          loading ? "Loading..." : "Update"
        }
        documentType="national_id_selfie"
        documentId={getDocumentId(
          "national_id_selfie"
        )}
        documentUrl={getDocumentUrl(
          "national_id_selfie"
        )}
        variant={getVariantByStatus(
          "national_id_selfie"
        )}
        status={getDocumentStatus("national_id_selfie")}
        onUploadSuccess={fetchDocuments}
      />

        </div>
      </>
    )}
  </>
);

};

export default NationalIdUpdate;