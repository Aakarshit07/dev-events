"use client";
import { useState, useCallback } from "react";

export const useArrayField = (initialItems: string[] = [""]) => {
  const [items, setItems] = useState<string[]>(initialItems);

  const handleItemChange = useCallback((index: number, value: string) => {
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)));
  }, []);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, ""]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const reset = useCallback((newItems: string[] = [""]) => {
    setItems(newItems);
  }, []);

  const getFilteredItems = useCallback(() => {
    return items.filter((item) => item.trim() !== "");
  }, [items]);

  return {
    items,
    handleItemChange,
    addItem,
    removeItem,
    reset,
    getFilteredItems,
  };
};
