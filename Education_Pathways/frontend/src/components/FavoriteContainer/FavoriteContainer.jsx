import React from "react";
import { Link } from "react-router-dom";
import "./FavoriteContainer.scss";

import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function FavoriteContainer({ courseCode }) {
  return (
    <Link to={`/courseinfo/${courseCode}`} className="link">
      <div className="favorite-container">
        <h2>{courseCode}</h2>
        <div style={{ width: "10px" }} />
        <FavoriteButton courseCode={courseCode} />
      </div>
    </Link>
  );
}
