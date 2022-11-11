import React from "react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./FavoriteContainer.scss";

export default function FavoriteContainer({ courseCode }) {
  return (
    <div className="favorite-container">
      <h2>{courseCode}</h2>
      <div style={{ width: "10px" }} />
      <FavoriteButton courseCode={courseCode} />
    </div>
  );
}
