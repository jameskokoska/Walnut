import React from "react";
import "./CourseInfoTab.css";

export default function CourseInfoTab({
  id,
  icon,
  text,
  active,
  secondary,
  onClick,
  collapse,
}) {
  const bgColor = { backgroundColor: active ? "#243E6B" : "white" };
  return (
    <div
      className={`${
        secondary
          ? "secondary-tab"
          : collapse
          ? "tab-collapse primary-tab"
          : "primary-tab"
      }`}
      style={bgColor}
      onClick={() => (secondary ? onClick() : onClick(id))}
    >
      <div
        className={`icon-container ${
          secondary && collapse ? "rotateArrow" : ""
        }`}
      >
        {icon}
      </div>
      <div className={`tab-text ${active ? `active-text` : `inactive-text`}`}>
        {text}
      </div>
    </div>
  );
}
