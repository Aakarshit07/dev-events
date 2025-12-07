"use client";
import { useState, useCallback } from "react";

interface FormStatus {
  type: "success" | "error" | null;
  message: string;
}

export const useFormStatus = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: "" });

  const startSubmitting = useCallback(() => {
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });
  }, []);

  const setSuccess = useCallback((message: string) => {
    setIsSubmitting(false);
    setStatus({ type: "success", message });
  }, []);

  const setError = useCallback((message: string) => {
    setIsSubmitting(false);
    setStatus({ type: "error", message });
  }, []);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setStatus({ type: null, message: "" });
  }, []);

  return {
    isSubmitting,
    status,
    startSubmitting,
    setSuccess,
    setError,
    reset,
  };
};
