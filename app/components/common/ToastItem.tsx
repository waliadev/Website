"use client";

import { useEffect, useState } from "react";

type Props = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
  onClose: (id: number) => void;
  duration?: number;
};

export default function ToastItem({
  id,
  message,
  type,
  onClose,
  duration = 3000,
}: Props) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 100 / (duration / 100));
    }, 100);

    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [id, duration, onClose]);

  const bg =
    type === "success"
      ? "#d1e7dd"
      : type === "error"
      ? "#f8d7da"
      : "#cff4fc";

  const color =
    type === "success"
      ? "#0f5132"
      : type === "error"
      ? "#842029"
      : "#055160";

  return (
    <div
      style={{
        background: bg,
        color: color,
        padding: "12px 16px",
        borderRadius: "8px",
        marginBottom: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        animation: "slideIn 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {message}

      {/* Close Button */}
      <span
        onClick={() => onClose(id)}
        style={{
          position: "absolute",
          right: "10px",
          top: "5px",
          cursor: "pointer",
        }}
      >
        ✕
      </span>

      {/* Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          width: `${progress}%`,
          background: color,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}