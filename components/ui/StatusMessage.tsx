import React from "react";

interface StatusMessageProps {
  type: "success" | "error" | null;
  message: string;
}

const StatusMessage = ({ type, message }: StatusMessageProps) => {
  if (!type || !message) return null;

  return (
    <div
      className={`status-message ${type === "success" ? "success" : "error"}`}
    >
      {message}
    </div>
  );
};

export default StatusMessage;
