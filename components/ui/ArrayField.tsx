"use client";
import React from "react";

interface ArrayFieldProps {
  label: string;
  hint?: string;
  items: string[];
  onItemChange: (index: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  placeholder?: string;
  addButtonText?: string;
  isCompact?: boolean;
}

const ArrayField = ({
  label,
  hint,
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  placeholder,
  addButtonText = "+ Add Item",
  isCompact = false,
}: ArrayFieldProps) => {
  return (
    <div className="array-field">
      <div className="array-field-header">
        <h3>{label}</h3>
        {hint && <p className="section-hint">{hint}</p>}
      </div>

      <div className={`array-items ${isCompact ? "tags-grid" : ""}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`array-item ${isCompact ? "tag-item" : ""}`}
          >
            <input
              type="text"
              value={item}
              onChange={(e) => onItemChange(index, e.target.value)}
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => onRemoveItem(index)}
              className="remove-btn"
              disabled={items.length === 1}
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" onClick={onAddItem} className="add-btn">
          {addButtonText}
        </button>
      </div>
    </div>
  );
};

export default ArrayField;
