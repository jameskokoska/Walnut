import React from "react";

export default function Comparison({ active }) {
  return (
    <svg
      width="31"
      height="25"
      viewBox="0 0 31 25"
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3145 0.921875C12.7255 0.328125 11.935 0 11.1135 0H3.1C1.395 0 0.0155 1.40625 0.0155 3.125L0 21.875C0 23.5938 1.395 25 3.1 25H27.9C29.605 25 31 23.5938 31 21.875V6.25C31 4.53125 29.605 3.125 27.9 3.125H18.6033C16.6171 3.125 14.7132 2.3319 13.3145 0.921875Z"
        fill={active ? "white" : "#243E6B"}
      />
    </svg>
  );
}
