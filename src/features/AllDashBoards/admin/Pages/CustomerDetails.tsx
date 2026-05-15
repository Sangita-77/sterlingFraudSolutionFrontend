import React from "react";
import Tabs from "../../GlobalComponents/Tabs";
import CustomerDetailsProfile from "../../GlobalComponents/Tabs/CustomerDetailsTabs/CustomerDetailsProfile";
import CustomerDetailsDoc from "../../GlobalComponents/Tabs/CustomerDetailsTabs/CustomerDetailsDoc";
import GlobalButton from "../../GlobalComponents/GlobalButtons";
import { ArrowLeftIcon} from 'lucide-animated';
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../Routes/route";

const navigate = useNavigate();

  const tabsData = [
    {
      label: "Customer Profile",
      content: <CustomerDetailsProfile/>,
    },
    {
      label: "Documents",
      content: <CustomerDetailsDoc/>,
    },
    {
      label: "Case Details",
      content: <></>,
    },
    {
      label: "Withdrawal Request",
      content: <></>,
    },
    {
      label: "Bank Details",
      content: <></>,
    },
    {
      label: "Insurance",
      content: <></>,
    },
  ];

const CustomerDetails: React.FC = () => {

  return (
    <div className="CustomerDocuments">
      <GlobalButton text="Back to Customers" variant="back" icon={<ArrowLeftIcon/>} textsize="md" onClick={() => navigate(routes.CUSTOMERS)} />
       <Tabs tabs={tabsData} variant="underline"/>
    </div>
  );
};

export default CustomerDetails; 