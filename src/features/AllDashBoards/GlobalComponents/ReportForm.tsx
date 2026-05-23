import React, { useState } from "react";
import StepForm from "./StepFrom";
import FormInput from "./FormInput";
import {
  UserIcon,
  SearchIcon,
  BadgeAlertIcon,
} from "lucide-animated";

import DragNdrop from "../GlobalComponents/DragNDrop";
import {
  Heading2,
  Paragraph2,
  UnorderedList,
} from "./HeadingPara";

export const ReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    description: "",
    cryptoaddress: "",
    ownerType: "",
    fundtype: "",
  });

  // upload files state in parent
  const [uploadedFiles, setUploadedFiles] =
    useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const steps = [
    {
      title: "Basic information",
      icon: <UserIcon />,
      content: (
        <div className="StepFormwrapper">
          <FormInput
            label="Full Name"
            type="text"
            name="fullname"
            value={formData.fullname}
            placeholder="Enter full name"
            onChange={handleChange}
            editable
            required
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
            editable
            required
          />

          <FormInput
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Enter phone number"
            onChange={handleChange}
            width="full"
            editable
            required
          />

          <p className="PolicyText">
            <span>
              <BadgeAlertIcon />
            </span>
            Read our privacy policy.
          </p>
        </div>
      ),
    },

    {
      title: "Upload Evidence",
      icon: <SearchIcon />,
      content: (
        <div className="StepFormwrapper">
          <div className="gradientBox3">
            <Heading2 text="Evidence" />

            <Paragraph2 text="Add or update customer Bank account information" />

            <DragNdrop
              files={uploadedFiles}
              onFileSelect={setUploadedFiles}
            />

            <Heading2 text="What count as evidence?" />

            <UnorderedList
              items={[
                {
                  text: "Chosen documents must not be expired.",
                },
                {
                  text:
                    "Documents should be in good condition and clearly visible.",
                },
                {
                  text:
                    "Make sure there is no light glare on the document.",
                },
              ]}
            />
          </div>
        </div>
      ),
    },

    {
      title: "Review",
      icon: <UserIcon />,
      content: (
        <div>
          <p>
            <strong>Name:</strong>{" "}
            {formData.fullname}
          </p>

          <p>
            <strong>Uploaded Files:</strong>
          </p>

          {uploadedFiles.map((file, index) => (
            <div key={index}>
              {file.name}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return <StepForm steps={steps} />;
};

export default ReportForm;