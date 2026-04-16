"use client";

import { useEffect, useState } from "react";
import ToastItem from "./ToastItem";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const handler = (e: any) => {
      const id = Date.now();

      setToasts((prev) => [
        ...prev,
        {
          id,
          message: e.detail.message,
          type: e.detail.type,
        },
      ]);
    };

    window.addEventListener("toast", handler);

    return () => window.removeEventListener("toast", handler);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999999,
      }}
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}