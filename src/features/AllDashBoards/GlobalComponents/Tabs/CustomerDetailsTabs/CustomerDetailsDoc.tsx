import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { EyeIcon } from "lucide-animated";
import Tabs from "../../Tabs";
import Tooltip from "../../ToolTip";
import GlobalModal from "../../GlobalModal";
import Loader from "../../Loaders";
import { Heading2, UnorderedList } from "../../HeadingPara";
import PassportFrontIcon from "../../../assets/images/PassportFrontIcon.svg";
import RejectedIcon from "../../../assets/images/RejectedIcon.svg";
import UnderProgress from "../../../assets/images/UnderProgress.svg";
import VarifiedIcon from "../../../assets/images/VarifiedIcon.svg";
import { BASE_URL } from "../../../../../api/config";
import { fetchWithAuth } from "../../../../../api/authService";

type CardVariant = "purple" | "green" | "orange" | "red";

type DocumentItem = {
  _id: string;
  documentType: string;
  status: number;
  filePath?: string;
  fileName?: string;
};

type DocumentConfig = {
  type: string;
  text: string;
};

type DocumentGroup = {
  className: string;
  heading: string;
  documents: DocumentConfig[];
};

type AdminDocumentCardProps = {
  documentConfig: DocumentConfig;
  documentItem?: DocumentItem;
  onStatusChange: (document: DocumentItem, status: 1 | 2) => Promise<void>;
  updatingDocumentId: string;
};

const documentGroups: Record<string, DocumentGroup> = {
  passport: {
    className: "PassportUpdate",
    heading: "Passport documents",
    documents: [
      { type: "passport_front", text: "Front side of Passport" },
      { type: "passport_back", text: "Back side of Passport" },
      { type: "passport_selfie", text: "Selfie with Passport" },
    ],
  },
  nationalId: {
    className: "PassportUpdate",
    heading: "National ID documents",
    documents: [
      { type: "national_id_front", text: "Front side of National ID" },
      { type: "national_id_back", text: "Back side of National ID" },
      { type: "national_id_selfie", text: "Selfie with National ID" },
    ],
  },
  drivingLicense: {
    className: "DrivingLicense",
    heading: "Driving License documents",
    documents: [
      { type: "driving_license_front", text: "Front side of Driving License" },
      { type: "driving_license_back", text: "Back side of Driving License" },
      { type: "driving_license_selfie", text: "Selfie with Driving License" },
    ],
  },
};

const getDocumentUrl = (document?: DocumentItem) => {
  if (!document?.fileName) return "";

  return `${BASE_URL.replace(/\/api$/, "")}/uploads/documents/${document.fileName}`;
};

const getVariantByStatus = (status?: number): CardVariant => {
  if (status === 0) return "orange";
  if (status === 1) return "green";
  if (status === 2) return "red";
  return "purple";
};

const getIconByStatus = (status?: number) => {
  if (status === 0) return UnderProgress;
  if (status === 1) return VarifiedIcon;
  if (status === 2) return RejectedIcon;
  return PassportFrontIcon;
};

const getStatusText = (status?: number) => {
  if (status === 0) return "Under Progress";
  if (status === 1) return "Verified";
  if (status === 2) return "Rejected";
  return "Not Uploaded";
};

const AdminDocumentCard: React.FC<AdminDocumentCardProps> = ({
  documentConfig,
  documentItem,
  onStatusChange,
  updatingDocumentId,
}) => {
  const [openPreview, setOpenPreview] = useState(false);
  const documentUrl = getDocumentUrl(documentItem);
  const isUpdating = updatingDocumentId === documentItem?._id;
  const status = documentItem?.status;

  return (
    <>
      <div className={`DocumentUpdate-card ${getVariantByStatus(status)}`}>
        <div className="icon-card-content">
          <img src={getIconByStatus(status)} alt="icon" className="icon-card-image" />
          <p className="icon-card-text">{documentConfig.text}</p>

          {documentUrl && (
            <div className="document-preview-wrap">
              <Tooltip text="Preview Document" position="top">
                <button
                  type="button"
                  className="document-preview-btn"
                  onClick={() => setOpenPreview(true)}
                >
                  <EyeIcon />
                </button>
              </Tooltip>
            </div>
          )}

          {status === 0 && documentItem ? (
            <div className="document-admin-actions">
              <button
                type="button"
                className="icon-card-button"
                disabled={isUpdating}
                onClick={() => onStatusChange(documentItem, 1)}
              >
                {isUpdating ? "Updating..." : "Approve"}
              </button>
              <button
                type="button"
                className="RejectButton icon-card-button"
                disabled={isUpdating}
                onClick={() => onStatusChange(documentItem, 2)}
              >
                Reject
              </button>
            </div>
          ) : (
            <button type="button" className="icon-card-button" disabled>
              {getStatusText(status)}
            </button>
          )}
        </div>
      </div>

      {openPreview && documentUrl && (
        <GlobalModal
          customeClass="documentPreviewModal"
          header={<h3>Document Preview</h3>}
          onCancel={() => setOpenPreview(false)}
          body={
            <div className="document-preview-container">
              {documentUrl.match(/\.(jpg|jpeg|png|webp)$/i) && (
                <img src={documentUrl} alt="document" className="document-preview-image" />
              )}

              {documentUrl.match(/\.pdf$/i) && (
                <iframe src={documentUrl} title="PDF Preview" className="document-preview-pdf" />
              )}

              {documentUrl.match(/\.(doc|docx)$/i) && (
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(documentUrl)}&embedded=true`}
                  title="DOC Preview"
                  className="document-preview-pdf"
                />
              )}
            </div>
          }
        />
      )}
    </>
  );
};

const CustomerDetailsDoc: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingDocumentId, setUpdatingDocumentId] = useState("");
  const [documentError, setDocumentError] = useState("");
  const [documentSuccess, setDocumentSuccess] = useState("");

  const fetchDocuments = async () => {
    if (!id) {
      setDocumentError("Customer id not found in URL.");
      return;
    }

    setLoading(true);
    setDocumentError("");

    try {
      const response = await fetchWithAuth(`${BASE_URL}/get-documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setDocumentError(result.message || "Unable to load documents.");
        return;
      }

      setDocuments(result.documents?.documents || []);
    } catch (error) {
      console.error("Fetch customer documents error:", error);
      setDocumentError("Something went wrong while loading documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [id]);

  const handleStatusChange = async (document: DocumentItem, status: 1 | 2) => {
    if (!id) {
      setDocumentError("Customer id not found in URL.");
      return;
    }

    setUpdatingDocumentId(document._id);
    setDocumentError("");
    setDocumentSuccess("");

    try {
      const payload = new FormData();
      payload.append("userId", id);
      payload.append("id", document._id);
      payload.append("documentType", document.documentType);
      payload.append("status", String(status));

      const response = await fetchWithAuth(`${BASE_URL}/update-documents`, {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setDocumentError(result.message || "Unable to update document status.");
        return;
      }

      setDocuments((prev) =>
        prev.map((item) =>
          item._id === document._id ? { ...item, status } : item
        )
      );
      // setDocumentSuccess(
      //   status === 1 ? "Document approved successfully." : "Document rejected successfully."
      // );
    } catch (error) {
      console.error("Update customer document status error:", error);
      setDocumentError("Something went wrong while updating document status.");
    } finally {
      setUpdatingDocumentId("");
    }
  };

  const renderDocumentGroup = (group: DocumentGroup) => (
    <>
      <Heading2 text={group.heading} />
      <UnorderedList
        items={[
          { text: "Review uploaded documents and preview files before changing status." },
          { text: "Approve marks the document as verified." },
          { text: "Reject marks the document as rejected." },
        ]}
      />
      <div className={`${group.className} UpdatedocumentsWarp`}>
        {group.documents.map((documentConfig) => {
          const documentItem = documents.find(
            (document) => document.documentType === documentConfig.type
          );

          return (
            <AdminDocumentCard
              key={documentConfig.type}
              documentConfig={documentConfig}
              documentItem={documentItem}
              updatingDocumentId={updatingDocumentId}
              onStatusChange={handleStatusChange}
            />
          );
        })}
      </div>
    </>
  );

  const tabsData = useMemo(
    () => [
      {
        label: "Passport",
        content: renderDocumentGroup(documentGroups.passport),
      },
      {
        label: "National ID Card",
        content: renderDocumentGroup(documentGroups.nationalId),
      },
      {
        label: "Driving License",
        content: renderDocumentGroup(documentGroups.drivingLicense),
      },
    ],
    [documents, updatingDocumentId]
  );

  return (
    <div className="CustomerDocuments">
      {loading ? (
        <Loader />
      ) : (
        <>
          {documentError && <p className="error">{documentError}</p>}
          {documentSuccess && <p className="profile-message">{documentSuccess}</p>}
          <Tabs tabs={tabsData} />
        </>
      )}
    </div>
  );
};

export default CustomerDetailsDoc;
