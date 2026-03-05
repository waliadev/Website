import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const DelhiIcon: React.FC<Props> = ({ style, ...props }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#2e7d32", ...style }}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* top cap */}
        <path d="M22 10h20" />
        <path d="M20 14h24" />

        {/* upper body */}
        <path d="M18 18h28" />

        {/* pillars */}
        <path d="M20 18v24" />
        <path d="M44 18v24" />

        {/* inner arch */}
        <path d="M26 42v-8a6 6 0 0 1 12 0v8" />

        {/* side details */}
        <path d="M24 26h4" />
        <path d="M36 26h4" />

        {/* base platform */}
        <path d="M14 48h36" strokeWidth="3" />
      </g>
    </svg>
  );
};

export default DelhiIcon;