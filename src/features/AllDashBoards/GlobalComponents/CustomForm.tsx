import React, { useEffect, useMemo, useState } from "react";
import FormInput from "./FormInput";

export interface FieldConfig {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  width?: "full" | "half";
  options?: { label: string; value: string }[]; 
  required?: boolean;
  defaultImage?: string;
}

export type FormValue = string | File;

interface CustomFormProps {
  fields: FieldConfig[];
  onSubmit: (data: Record<string, FormValue>) => void;
  variant?: "view" | "edit";
  formId?: string;
  SubmitText?: string;
  initialValues?: Record<string, string>;
  isSubmitting?: boolean;
}

const emptyInitialValues: Record<string, string> = {};

const CustomForm: React.FC<CustomFormProps> = ({ fields, onSubmit, SubmitText, variant, formId = "customForm", initialValues, isSubmitting = false}) => {
  const resolvedInitialValues = initialValues ?? emptyInitialValues;
  const initialState = useMemo(() => fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as Record<string, FormValue>), [fields]);

  const [editableFields, setEditableFields] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, FormValue>>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
const [preview, setPreview] = useState<string>("");

useEffect(() => {
  setFormData({
    ...initialState,
    ...resolvedInitialValues,
  });
}, [initialState, resolvedInitialValues]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, files, value } = e.target;

  if (files && files[0]) {
    const file = files[0];

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    setPreview(URL.createObjectURL(file)); // 👈 instant preview
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

const handleEditToggle = (name: string) => {
  setEditableFields((prev) => ({
    ...prev,
    [name]: !prev[name],
  }));
};

const validate = () => {
  let newErrors: Record<string, string> = {};

  fields.forEach((field) => {
    const isRequired = field.required ?? false;

    if (isRequired && !formData[field.name]) {
      newErrors[field.name] = `${field.label} is required`;
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };


const profileFeild = fields.filter((field) => field.type === "file");
const normalFields = fields.filter((field) => field.type !== "file");

const isEditable = (name: string) => {
  if (variant === "edit") return true;
  return editableFields[name];
};

const getStringValue = (name: string): string => {
  const value = formData[name];
  return typeof value === "string" ? value : "";
};


  return (
<div className="">    
<form id={formId} onSubmit={handleSubmit} className="DashBoardForms d-flex">

  <div className="profile-fields-wrapper">
    {profileFeild.map((field) => (
      <FormInput
        key={field.name}
        DefaultProfile={field.defaultImage}
        width={field.width}
        placeholder={field.placeholder}
        label={field.label}
        type={field.type}
        name={field.name}
        value={getStringValue(field.name)}
        onChange={handleChange}
        preview={preview}
        error={errors[field.name]}
        options={field.options}
        editable={isEditable(field.name)}
        onEdit={() => handleEditToggle(field.name)}
        required={field.required}
      />
    ))}
  </div>
    <div className="normal-fields-wrapper">
    {normalFields.map((field) => (
      <FormInput
        key={field.name}
        DefaultProfile={field.defaultImage}
        width={field.width}
        placeholder={field.placeholder}
        label={field.label}
        type={field.type}
        name={field.name}
        value={getStringValue(field.name)}
        onChange={handleChange}
        preview={preview}
        error={errors[field.name]}
        options={field.options}
        editable={field.type === "radio" ? true : isEditable(field.name)}
        onEdit={() => handleEditToggle(field.name)}
        required={field.required}
      />
    ))}
  </div>
  <div className="submit-button"><button type="submit" disabled={isSubmitting}>{SubmitText}</button></div>

</form>
</div>
  );
};

export default CustomForm;
