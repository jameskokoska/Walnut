import React from "react";
import "./Button.scss";

export default function Button({ label, onClick, isSecondary, style, icon }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`${isSecondary ? "secondary-button" : "primary-button"} ${
        icon ? "icon-button" : ""
      }`}
    >
      {label !== undefined ? <>{label}</> : <></>}
      {icon !== undefined ? (
        <img src={icon} className="button-icon" alt="" />
      ) : (
        <></>
      )}
    </div>
  );
}
