import React from "react";
import { Heading1, Paragraph } from "../../GlobalComponents/HeadingPara";
import { useTranslation } from "react-i18next";
import ReportForm from "../../GlobalComponents/ReportForm";


const CutomerReportFraud: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading1 text={t("nav.reportfraud")} />
      <Paragraph text="Please provide a brief description of the incident, including key details such as the issue and any relevant information for review." />
      <div className="d-flex ReportFormWrap">
        <div className="ReportForm">
          <ReportForm/>
        </div>
        <div className="ReportFormCards">
           
        </div>
      </div>
    </>
  );
};

export default CutomerReportFraud;