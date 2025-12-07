import React from "react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  submittingText?: string;
  defaultText?: string;
}

const SubmitButton = ({
  isSubmitting,
  submittingText = "Submitting...",
  defaultText = "Submit",
}: SubmitButtonProps) => {
  return (
    <button type="submit" className="submit-btn" disabled={isSubmitting}>
      {isSubmitting ? submittingText : defaultText}
    </button>
  );
};

export default SubmitButton;
