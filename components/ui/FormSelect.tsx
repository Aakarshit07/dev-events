import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
}

const FormSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
}: FormSelectProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
