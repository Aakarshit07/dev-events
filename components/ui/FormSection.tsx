import React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <section className="form-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default FormSection;
