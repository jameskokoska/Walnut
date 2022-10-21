import React from "react";

export default function Arrow({ collapse }) {
  return (
    <svg
      width="15"
      height="26"
      viewBox="0 0 15 26"
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform={collapse ? "scale (-1, 1)" : ""}
        transform-origin={collapse ? "center" : ""}
        d="M14.3337 22.0157L5.49544 12.9884L14.3337 3.96107C15.2221 3.05369 15.2221 1.58792 14.3337 0.680537C13.4453 -0.226846 12.0103 -0.226846 11.1219 0.680537L0.666287 11.3597C-0.222096 12.2671 -0.222096 13.7329 0.666287 14.6403L11.1219 25.3195C12.0103 26.2268 13.4453 26.2268 14.3337 25.3195C15.1993 24.4121 15.2221 22.923 14.3337 22.0157Z"
        fill="#243E6B"
      />
    </svg>
  );
}
