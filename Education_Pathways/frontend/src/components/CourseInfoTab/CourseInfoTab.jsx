import React from "react";
import "./CourseInfoTab.css";

export default function CourseInfoTab({
  id,
  icon,
  text,
  active,
  secondary,
  onClick,
}) {
  const bgColor = { backgroundColor: active ? "#243E6B" : "white" };
  return (
    <div
      className={`${secondary ? "secondary-tab" : "primary-tab"}`}
      style={bgColor}
      onClick={() => !secondary && onClick(id)}
    >
      <div className="icon-container">{icon}</div>
      <div className={active ? `active-text` : `inactive-text`}>{text}</div>
    </div>
  );
}
