import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./SearchResultContainer.scss";

export default function SearchResultContainer({
  course,
  searchTerm,
  numberResults,
}) {
  const manyResults = numberResults > 5;
  const descriptionLength = manyResults ? 90 : 250;
  const foundDescription = course["description"].indexOf(searchTerm);
  let displayDescription = course["description"];
  let showDescription = true;
  if (displayDescription === undefined || displayDescription === "") {
    showDescription = false;
  } else if (foundDescription === -1) {
    displayDescription = displayDescription.slice(0, descriptionLength) + "...";
  } else {
    displayDescription = (
      <p>
        {displayDescription.slice(
          foundDescription - 30 < 0 ? 0 : foundDescription - 30,
          foundDescription
        )}
        <b>{searchTerm}</b>
        {displayDescription.slice(
          foundDescription + searchTerm.length,
          foundDescription + descriptionLength
        )}
        ...
      </p>
    );
  }
  return (
    <Link
      to={`/courseinfo/${course["code"]}`}
      className="search-result-container link"
      style={{
        width: manyResults ? "unset" : "100%",
        maxWidth: manyResults ? "800px" : "unset",
        minWidth: manyResults ? "400px" : "unset",
        flex: manyResults ? 1 : "unset",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>{course["code"]}</h2>
          <h3>{course["name"]}</h3>
        </div>
        <div>
          <FavoriteButton courseCode={course["code"]} />
        </div>
      </div>

      <h4>{course["division"]}</h4>
      {showDescription ? <p>{displayDescription}</p> : <></>}
    </Link>
  );
}
