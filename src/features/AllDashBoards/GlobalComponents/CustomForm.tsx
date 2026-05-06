import React, { useState } from "react";
import FormInput from "./FormInput";

export interface FieldConfig {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  width?: "full" | "half";
  options?: { label: string; value: string }[]; 
}

interface CustomFormProps {
  fields: FieldConfig[];
  onSubmit: (data: Record<string, string>) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ fields, onSubmit }) => {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState<Record<string, string>>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? (checked ? "true" : "") : value,
  }));
};


  const validate = () => {
    let newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (!formData[field.name]) {
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

  return (
    <form onSubmit={handleSubmit} className="DashBoardForms d-flex">
      {fields.map((field) => (
       <FormInput
          width={field.width}
          key={field.name}
          placehoder={field.placeholder}
          label={field.label}
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
          options={field.options}
        />
      ))}

      <button className="Submit" type="submit">Submit</button>

    </form>
  );
};

export default CustomForm;