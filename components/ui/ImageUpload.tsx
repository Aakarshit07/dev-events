"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  id: string;
  label: string;
  onImageChange: (file: File | null) => void;
  accept?: string;
  maxSizeText?: string;
}

const ImageUpload = ({
  id,
  label,
  onImageChange,
  accept = "image/*",
  maxSizeText = "PNG, JPG up to 10MB",
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onImageChange(null);
      setPreview(null);
    }
  };

  const handleRemove = () => {
    onImageChange(null);
    setPreview(null);
  };

  return (
    <div className="image-upload-wrapper">
      <h3>{label}</h3>
      <div className="image-upload">
        <label htmlFor={id} className="image-upload-label">
          {preview ? (
            <div className="image-preview-container">
              <Image
                src={preview}
                alt="Event preview"
                width={400}
                height={250}
                className="image-preview"
              />
            </div>
          ) : (
            <div className="upload-placeholder">
              <span className="upload-icon">📷</span>
              <span>Click to upload event image</span>
              <span className="upload-hint">{maxSizeText}</span>
            </div>
          )}
        </label>
        <input
          type="file"
          id={id}
          name={id}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="remove-image-btn"
          >
            Remove Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
