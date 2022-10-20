import React from "react";
import "./CourseInfoTab.css";

export default function CourseInfoTab({ icon, text, secondary }) {
  return (
    <div className="courseInfo-tab">
      <div className="icon-container">{icon}</div>
      <div className="text-container">{text}</div>
    </div>
  );
}
