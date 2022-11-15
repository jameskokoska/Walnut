import React from "react";
import { Link } from "react-router-dom";
import "./FavoriteContainer.scss";

import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function FavoriteContainer({ courseCode, setCourseCode }) {
  const content = <div className="favorite-container">
    <h2>{courseCode}</h2>
    <div style={{ width: "10px" }} />
    <FavoriteButton courseCode={courseCode} />
  </div>
  if(setCourseCode){
    return <div onClick={()=>setCourseCode(courseCode)}>
      {content}
    </div>
  }
  return (
    <Link to={`/courseinfo/${courseCode}`} className="link">
      {content}
    </Link>
  );
}
