import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const NoidaIcon: React.FC<Props> = ({ style, ...props }) => {
  return (
    <svg
      viewBox="0 0 96 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#2e7d32", ...style }}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ===== ground line ===== */}
        <path d="M6 48H90" strokeWidth="2.6" />

        {/* ===== left sweeping arch ===== */}
        <path d="M8 36C18 14 34 12 48 26" />
        <path d="M18 42C26 26 36 24 48 32" />

        {/* ===== right sweeping arch ===== */}
        <path d="M88 36C78 14 62 12 48 26" />
        <path d="M78 42C70 26 60 24 48 32" />

        {/* ===== center pedestal ===== */}
        <rect x="44" y="32" width="8" height="8" rx="1" />

        {/* ===== small statue circle ===== */}
        <circle cx="48" cy="28" r="2.4" />

        {/* ===== tiny base under pedestal ===== */}
        <path d="M40 44h16" />
      </g>
    </svg>
  );
};

export default NoidaIcon;