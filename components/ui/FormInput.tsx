import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "date" | "time" | "email" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
}

const FormInput = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  maxLength,
  disabled = false,
}: FormInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;
