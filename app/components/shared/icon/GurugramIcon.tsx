import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const GurugramIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="46"
      height="109"
      viewBox="0 0 46 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "#16a34a" }} // ✅ default green
      {...props}
    >
      <path
        d="M4.594 67.69H1v39.511h3.594v-39.51ZM11.188 45.581H7.594v61.62h3.594v-61.62ZM17.782 31.968h-3.594V107.2h3.594V31.968ZM24.376 16.683h-3.594v90.518h3.594V16.684ZM30.97 35.234h-3.594v71.967h3.594V35.235ZM37.564 52.551H33.97v54.65h3.594v-54.65ZM44.158 71.502h-3.594v35.699h3.594V71.503ZM20.782 1v24.396"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
    </svg>
  );
};

export default GurugramIcon;