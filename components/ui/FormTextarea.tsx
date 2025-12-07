import React from "react";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
}

const FormTextarea = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  maxLength,
  rows = 3,
  disabled = false,
}: FormTextareaProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
      />
    </div>
  );
};

export default FormTextarea;
