import React, { useMemo } from "react";

import CustomForm from "../../CustomForm";
import type { FieldConfig} from "../../CustomForm";
import {Heading2, Heading1, Paragraph2, UnorderedList, Heading3} from "../../HeadingPara";
import ProfileImg from "../../../assets/images/fAvtar.webp";
import { MailCheckIcon} from 'lucide-animated';

const CustomerDetailsProfile: React.FC = () => {

  const fields: FieldConfig[] = useMemo(
    () => [
      { label: "Full Name", type: "text", name: "firstname", placeholder: "John Doe", width: "full", },
      { label: "Address", type: "text", name: "address", placeholder: "Enter address", width: "full", },
      { label: "City", type: "text", name: "city", placeholder: "Enter city", },
      { label: "State / province / Region", type: "text", name: "state", placeholder: "Enter state/province/region", },
      { label: "Postal / Zip Code", type: "number", name: "zipcode", placeholder: "Enter postal/zip code", },
      { label: "Country", type: "text", name: "country", placeholder: "United States", },
    ],
    []
  );

  const handleSubmit = (data: Record<string, any>) => {
    console.log(data);
  };

  return (
    <>
    <div className="d-flex CustomerDetailsWrap">
        <div className="CustomerDetailsProfile">
          <div className="ProfileImage">
            <img src={ProfileImg} alt="" />
            <div className="activeStatus"></div>
          </div>  
          <Heading1 text="Lily Smith"/>
          <Paragraph2 text="Customer"/>
            <UnorderedList
            variant="icon"
            items={[
                {
                text: "jessica.hanson@example.com",
                icon: <MailCheckIcon/>
                },
                {
                text: "(219) 555-0114",
                icon: <MailCheckIcon/>
                },
            ]}
            />
                        
        </div>
        <div className="CustomerDetailsFormWrap">
            <div className="ProfileForm CustomerDetailsForm">
                <Heading2 text="Personal Information"/>
                  <CustomForm
                      fields={fields}
                      variant="view"
                      onSubmit={handleSubmit}
                      SubmitText="Save Changes"
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