import React from "react";

export default function Prof({ active }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 16C20.42 16 24 12.42 24 8C24 3.58 20.42 0 16 0C11.58 0 8 3.58 8 8C8 12.42 11.58 16 16 16ZM16 20C10.66 20 0 22.68 0 28V30C0 31.1 0.9 32 2 32H30C31.1 32 32 31.1 32 30V28C32 22.68 21.34 20 16 20Z"
        fill={active ? "white" : "#243E6B"}
      />
    </svg>
  );
}
