import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const GhaziabadIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#16a34a" }} // ✅ default green
      {...props}
    >
      <path
        d="M10 60V30h8v30M24 60V18h10v42M40 60V25h8v35M55 60V35h6v25M5 60h60"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GhaziabadIcon;