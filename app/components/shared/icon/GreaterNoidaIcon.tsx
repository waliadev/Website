import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const GreaterNoidaIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="69"
      height="69"
      viewBox="0 0 69 69"
      fill="none"
      style={{ color: "#16a34a" }} // ✅ default green
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <mask
          id="b"
          width="69"
          height="69"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path fill="#fff" d="M0 0h68.267v68.267H0V0Z" />
        </mask>

        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          mask="url(#b)"
        >
          {/* 🏢 Greater Noida building style */}
          <path d="M20 60V25h10v35M39 60V15h10v45M10 60h50" />
          <path d="M24 30h2M24 36h2M24 42h2M24 48h2" />
          <path d="M43 22h2M43 28h2M43 34h2M43 40h2M43 46h2" />
        </g>
      </g>

      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h68.267v68.267H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GreaterNoidaIcon;