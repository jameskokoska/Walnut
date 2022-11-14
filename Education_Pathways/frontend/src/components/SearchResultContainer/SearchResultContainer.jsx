import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./SearchResultContainer.scss";

export default function SearchResultContainer({
  course,
  searchTerm,
  numberResults,
}) {
  const navigate = useNavigate();

  // Config based on number of results
  const manyResults = numberResults > 5;
  const descriptionLength = manyResults ? 90 : 250;

  /* Bold matching course name and description */
  // Bold in names
  let showName = true;
  let displayName = course["name"];
  if (displayName === undefined || displayName === "") {
    showName = false;
  } else {
    const foundName = course["name"]
      .toUpperCase()
      .indexOf(searchTerm.toUpperCase().trim());

    if (foundName !== -1) {
      displayName = (
        <>
          {displayName.slice(0, foundName)}
          <span className="result-bold-heading">
            {displayName.slice(foundName, foundName + searchTerm.length)}
          </span>
          {displayName.slice(foundName + searchTerm.length)}
        </>
      );
    }
  }

  // Bold in description
  let showDescription = true;
  let displayDescription = course["description"];
  if (displayDescription == undefined || displayDescription === "") {
    showDescription = false;
  } else {
    // make upper case so the check is not case-sensitive
    const foundDescription = course["description"]
      .toUpperCase()
      .indexOf(searchTerm.toUpperCase().trim());

    if (foundDescription === -1) {
      displayDescription =
        displayDescription.slice(0, descriptionLength) + "...";
    } else {
      displayDescription = (
        <>
          {foundDescription - 30 < 0
            ? displayDescription.slice(0, foundDescription)
            : "..." +
              displayDescription.slice(foundDescription - 30, foundDescription)}
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
        </>
      );
    }
  }

  return (
    <div
      onClick={(e) => {
        if (!e.target.classList.contains("favorite-button")) {
          navigate(`/courseinfo/${course["code"]}`, {
            state: { course: course },
          });
        }
      }}
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
    </div>
  );
}
