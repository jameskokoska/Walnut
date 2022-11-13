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

  // find in name
  let searchName = searchTerm.toString();
  const foundName = course["name"].toLowerCase().indexOf(searchTerm.toLowerCase());
  let displayName = course["name"].toString();
  let showName = true;
  const nameLength = displayName.length;
  // in case there is no name term
  if (displayName === undefined || displayName === "") {
    showName = false;
  } else if (foundName) {
    displayName.replace(new RegExp(searchName, "gi"), '<b>$1</b>');
  }
  
  // find in description
  let showDescription = true;
  let displayDescription = course["description"];
  if (displayDescription == undefined || displayDescription === "") {
    showDescription = false;
  } else {
    // make upper case so the check is not case-sensitive
    const foundDescription = course["description"].toUpperCase().indexOf(searchTerm.toUpperCase());

    if (foundDescription === -1) {
      displayDescription = displayDescription.slice(0, descriptionLength) + "...";
    } else {
      displayDescription = (
        <p>
          {displayDescription.slice(
            foundDescription - 30 < 0 ? 0 : foundDescription - 30,
            foundDescription
          )}
          <b>
            {displayDescription.slice(
            foundDescription,
            foundDescription + searchTerm.length
          )}
          </b>
          {displayDescription.slice(
            foundDescription + searchTerm.length,
            foundDescription + descriptionLength
          )}
          ...
        </p>
      );
    }
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
          {showName ? <h3>{displayName}</h3> : <></>}
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
