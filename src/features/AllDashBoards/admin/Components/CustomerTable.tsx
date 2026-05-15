import { useEffect, useState } from "react";
import Table from "../../GlobalComponents/Table";
import Search from "../../assets/images/Search.svg";
import Button from "../../GlobalComponents/GlobalButtons";
import GlobalmModal from "../../GlobalComponents/GlobalModal";
import Loader from "../../GlobalComponents/Loaders";
import Tooltip from "../../GlobalComponents/ToolTip";
import "./Components.css";
import { routes } from "../../../../Routes/route";
import { useNavigate } from "react-router-dom";
 

import { BASE_URL } from "../../../../api/config";

import { fetchWithAuth} from "../../../../api/authService";

// type UserItem = {
//   _id: string;
//   name: string;
//   email: string;
//   detectedCountry: string;
//   phone: string;
//   status: number;
// };

type UserItem = {
  _id: string;
  name: string;
  email: string;
  detectedCountry: string;
  phone: string;
  status: number;
  statuses?: {
    user?: number;
    documents?: StatusItem[];
    reports?: StatusItem[];
    caseDocuments?: StatusItem[];
  };
  documentStatuses?: StatusItem[];
  reportStatuses?: StatusItem[];
  caseDocumentStatuses?: StatusItem[];
  profileImage?: {
    url?: string;
  };
};

type StatusItem = {
  id: string;
  documentType?: string;
  status: number;
  uploadedAt?: string;
};

type CustomerRow = {
  id: string;
  _id: string;
  name: string;
  location: string;
  number: string;
  email: string;
  amount: number | string;
  status: string;
  statusDetails: string;
  statusVariant: "green" | "red" | "orange" | "blue";
  profileImage: string;
  profileInitial: string;
};

const reportStatusText: Record<number, string> = {
  0: "Reported Case Pending",
  1: "Reported Case Approved",
  2: "Reported Case Rejected",
  3: "Reported Case Detected",
  4: "Reported Case Document Submitted",
  5: "Reported Case Under Review",
  6: "Reported Case Analysis",
  7: "Reported Case Resulation",
};

const caseDocumentStatusText: Record<number, string> = {
  0: "Reported Case Document Pending",
  1: "Reported Case Document Approved",
  2: "Reported Case Document Rejected",
};

const requiredDocumentTypes = [
  "passport_front",
  "passport_back",
  "passport_selfie",
  "national_id_front",
  "national_id_back",
  "national_id_selfie",
  "driving_license_front",
  "driving_license_back",
  "driving_license_selfie",
];

const documentTypeText: Record<string, string> = {
  passport_front: "Passport Front",
  passport_back: "Passport Back",
  passport_selfie: "Passport Selfie",
  national_id_front: "National ID Front",
  national_id_back: "National ID Back",
  national_id_selfie: "National ID Selfie",
  driving_license_front: "Driving License Front",
  driving_license_back: "Driving License Back",
  driving_license_selfie: "Driving License Selfie",
};

const getDocumentTypeText = (documentType: string) =>
  documentTypeText[documentType] || documentType.replace(/_/g, " ");

const getDocumentListText = (documentTypes: string[]) =>
  documentTypes.map(getDocumentTypeText).join(", ");

const getStatusFromList = (
  statuses: StatusItem[] | undefined,
  statusText: Record<number, string>,
  fallback: string
) => {
  if (!statuses?.length) {
    return fallback;
  }

  const status = statuses.some((item) => item.status === 2)
    ? 2
    : statuses.some((item) => item.status !== 1)
      ? statuses.find((item) => item.status !== 1)?.status
      : 1;

  return statusText[status ?? 0] || fallback;
};

const getKycStatusDetails = (documents: StatusItem[] | undefined) => {
  const documentMap = new Map(
    documents
      ?.filter((document) => document.documentType)
      .map((document) => [document.documentType, document.status])
  );

  const rejectedDocuments = requiredDocumentTypes.filter(
    (documentType) => documentMap.get(documentType) === 2
  );

  if (rejectedDocuments.length) {
    return {
      isApproved: false,
      label: "User Kyc Reject",
      details: `Rejected: ${getDocumentListText(rejectedDocuments)}`,
    };
  }

  const missingDocuments = requiredDocumentTypes.filter(
    (documentType) => documentMap.get(documentType) === undefined
  );

  const pendingDocuments = requiredDocumentTypes.filter(
    (documentType) => documentMap.get(documentType) === 0
  );

  if (missingDocuments.length || pendingDocuments.length) {
    const details = [];

    if (missingDocuments.length) {
      details.push(
        `Submit Pending: ${getDocumentListText(missingDocuments)}`
      );
    }

    if (pendingDocuments.length) {
      details.push(
        `Pending Approval: ${getDocumentListText(pendingDocuments)}`
      );
    }

    return {
      isApproved: false,
      label: "User Kyc Pending",
      details: details.join("; "),
    };
  }

  return {
    isApproved: true,
    label: "User Kyc Approve",
    details: "",
  };
};

const getVariantByStatusLabel = (label: string) =>
  label.includes("Reject") ||
  label.includes("Rejected") ||
  label.includes("Pending") ||
  label.includes("Detected") ||
  label.includes("Submitted") ||
  label.includes("Under Review") ||
  label.includes("Analysis") ||
  label.includes("Resulation")
    ? "blue" as const
    : "green" as const;

const getCustomerStatus = (user: UserItem) => {
  const userStatus = user.statuses?.user ?? user.status;

  if (userStatus !== 1) {
    return {
      label: "Inactive User",
      details: "User account is inactive.",
      variant: "red" as const,
    };
  }

  const documents = user.statuses?.documents ?? user.documentStatuses;
  const kycStatus = getKycStatusDetails(documents);

  if (!kycStatus.isApproved) {
    return {
      label: kycStatus.label,
      details: kycStatus.details,
      variant: "orange" as const,
    };
  }

  const reports = user.statuses?.reports ?? user.reportStatuses;
  const caseDocuments =
    user.statuses?.caseDocuments ?? user.caseDocumentStatuses;

  if (reports?.length) {
    const label = getStatusFromList(
      reports,
      reportStatusText,
      "Case Pending"
    );

    return {
      label,
      details: "",
      variant: getVariantByStatusLabel(label),
    };
  }

  if (caseDocuments?.length) {
    const label = getStatusFromList(
      caseDocuments,
      caseDocumentStatusText,
      "Case Document Pending"
    );

    return {
      label,
      details: "",
      variant: getVariantByStatusLabel(label),
    };
  }

  return {
    label: kycStatus.label,
    details: "",
    variant: "green" as const,
  };
};

const CustomerTable = () => {

  const [rows, setRows] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(2);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteIds, setDeleteIds] = useState<string | string[]>([]);
  const [pagination, setPagination] =
  useState({ total: 0, page: 1, limit: 10, flag: 2, totalPages: 1, }); 
  useEffect(() => {
  fetchUsers();
  }, [ page, limit, flag, sortBy, sortOrder, statusFilter, search, ]);

  const openDeleteConfirm = (ids: string | string[]) => {
    setDeleteIds(ids);
    setOpenDeleteModal(true);
  };
  const getProfileImageUrl = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    return `${BASE_URL.replace(/\/api$/, "")}${url}`;
  };

  const fetchUsers = async () => {
    setLoading(true);

    try {
      let apiUrl = `${BASE_URL}/get-all-users`;

      const payload: any = { page, limit, flag: 2, sortBy, sortOrder, };

      // status filter
      if (statusFilter !== "") {
        payload.status = Number(statusFilter);
      }

      // SEARCH API
      if (search.trim()) {
        apiUrl = `${BASE_URL}/search-users`;

        payload.search = search;
      }

      const response = await fetchWithAuth(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        return;
      }

      const formattedRows = result.users.map(
        (user: UserItem) => {
          const customerStatus = getCustomerStatus(user);

          return {
            profileImage:
            user.profileImage?.url || "",
            profileInitial:
            user.name?.charAt(0)?.toUpperCase() ||
            "U",
            // id: user._id,
            id: user._id,
            _id: user._id,
            name: user.name || "-",
            location:
              user.detectedCountry || "-",
            number:
              user.phone || "-",
            email:
              user.email || "-",

            amount: "--",
            status: customerStatus.label,
            statusDetails: customerStatus.details,
            statusVariant: customerStatus.variant,
          };
        }
      );

      setRows(formattedRows);

      setPagination(result.pagination);
    } catch (error) {
      console.error(
        "Fetch users error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUsers = async (userIds: string | string[]) => {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/delete-users`,
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userIds,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        alert(
          result.message ||
            "Unable to delete users."
        );

        return;
      }

      fetchUsers();
    } catch (error) {
      console.error(
        "Delete users error:",
        error
      );
    }
  };
  const navigate = useNavigate();
  const columns = [
    {
      key: "name",
      title: "Name",
      render: (
        value: string,
        row: any
      ) => (
        <div className="userInfoWrap">
          {row.profileImage ? (
            <img src={getProfileImageUrl(row.profileImage)} alt={value} className="userProfileImage" />
          ) : (
            <div className="userProfileInitial">
              {row.profileInitial}
            </div>
          )}

          <span>{value}</span>
        </div>
      ),
    },
    { key: "location", title: "Location", },
    { key: "number", title: "Number", },
    { key: "email", title: "Mail ID", },
    { key: "amount", title: "Amount", },
    {
      key: "status",
      title: "Status",
      render: (
        status: string,
        row: CustomerRow
      ) => {
        const button = (
          <Button
            text={status}
            variant={row.statusVariant}
          />
        );

        return row.statusDetails ? (
          <Tooltip text={row.statusDetails} position="top-left" > {button} </Tooltip>
        ) : (
          button
        );
      },
    },
    {
      key: "action",
      title: "Action",

      render: (
        _: any,
        row: any
      ) => (
        <div
        >
        <Button
          variant="purple"
          text="View"
          onClick={() => navigate(`${routes.CUSTOMERDETAILS}/${row._id}`)}
        />
        </div>
      ),
    },
  ];

  return (
    <div className="CustomerList">
      <div className="ListTopWrap">
        <div className="SearchWrap">
          <div className="search-box">
            <img src={Search} className="search" />
            {/* SEARCH */}
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch( e.target.value ) } />
            <select
              className="custom-select"
              onChange={(e) => {
                const value =
                  e.target.value;
                if (value ==="location_asc") { setSortBy("detectedCountry"); setSortOrder("asc"); }
                if (value ==="location_desc") { setSortBy("detectedCountry"); setSortOrder("desc"); }
                if (value ==="name_asc") { setSortBy("name"); setSortOrder("asc"); }
                if (value ==="name_desc") { setSortBy("name"); setSortOrder("desc"); }
                if (value === "active") { setStatusFilter("1"); }
                if (value ==="pending") { setStatusFilter("0"); }
              }}
            >
              <option value=""> Sort / Filter </option>
              <option value="location_asc"> Sort by Location A-Z </option>
              <option value="location_desc"> Sort by Location Z-A </option>
              <option value="name_asc"> Sort by Name A-Z </option>
              <option value="name_desc"> Sort by Name Z-A </option>
              <option value="active"> Active Users </option>
              <option value="pending"> Pending Users </option>
            </select>
          </div>
        </div>
      </div>

      {/* <Table
        columns={columns}
        rows={rows}
        selectable={true}
        pagination={true}
        currentPage={
          pagination.page
        }
        totalPages={
          pagination.totalPages
        }
        onPageChange={(
          newPage: number
        ) => setPage(newPage)}
        rowsPerPageOptions={[
          10,
          20,
          50,
          100,
        ]}
        onRowsPerPageChange={(
          value: number
        ) => {
          setLimit(value);
          setPage(1);
          setFlag(2);
        }}
        onBulkDelete={true}
      /> */}

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          rows={rows}
          selectable={true}
          pagination={true}
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          rowsPerPage={limit}
          onPageChange={(newPage) =>
            setPage(newPage)
          }
          onRowsPerPageChange={(value) => {
            setLimit(value);
            setPage(1);
            setFlag(2);
          }}
          rowsPerPageOptions={[ 10, 20, 50, 100, ]}
          onBulkDelete={true}

          onDeleteSelected={(selectedRows) => {
            const ids = selectedRows.map((row: any) => row._id);

            openDeleteConfirm(ids);
          }}
        />
      )}

      {openDeleteModal && (
        <GlobalmModal
          customeClass="deleteConfirmModal"
          header={<h3>Confirm Delete</h3>}
          body={
            <>         
              <p>
                Are you sure you want
                to delete selected
                user(s)?
              </p>

              <div className="modalActions">
                <button
                  className="cancelBtn"
                  onClick={() =>setOpenDeleteModal(false)}
                >Cancel
                </button>

                <button
                  className="confirmBtn"
                  onClick={async () => {await handleDeleteUsers(deleteIds);
                    setOpenDeleteModal(false);
                  }}
                >Yes, Delete</button>
              </div>
            </>
          }
          onCancel={() =>setOpenDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default CustomerTable;
