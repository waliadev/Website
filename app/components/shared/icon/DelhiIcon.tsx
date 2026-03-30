import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const DelhiIcon: React.FC<Props> = ({ style, ...props }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "#2e7d32", width: "42px", height: "42px", ...style }}
      {...props}
    >
      {/* Top Section */}
      <rect x="22" y="8" width="20" height="4" rx="1" />

      {/* Upper Body */}
      <rect x="18" y="12" width="28" height="6" rx="1" />

      {/* Main Monument */}
      <rect x="16" y="18" width="32" height="28" rx="2" />

      {/* Inner Arch (India Gate style) */}
      <path d="M26 46V32a6 6 0 0 1 12 0v14" />

      {/* Inner Opening */}
      <path d="M28 46V34a4 4 0 0 1 8 0v12" strokeWidth="1.8" />

      {/* Side carvings */}
      <line x1="20" y1="24" x2="24" y2="24" />
      <line x1="40" y1="24" x2="44" y2="24" />

      {/* Base Platform */}
      <rect x="12" y="48" width="40" height="4" rx="1" strokeWidth="3" />
    </svg>
  );
};

export default DelhiIcon;