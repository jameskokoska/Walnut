import React from "react";
import "./CourseInfoTab.css";

export default function CourseInfoTab({ icon, text, active, secondary }) {
  const bgColor = { backgroundColor: active ? "#243E6B" : "white" };
  return (
    <div
      className={`courseInfo-tab ${
        secondary ? "secondary-tab" : "primary-tab"
      }`}
      style={bgColor}
    >
      <div className="icon-container">{icon}</div>
      <div className="text-container">{text}</div>
    </div>
  );
}
