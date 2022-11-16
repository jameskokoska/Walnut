import React from "react";

import "./TimetableSectionContainer.scss";

export default function TimetableSectionContainer({ section }) {
  return (
    <div className="timetable-container">
      <h2 style={{ margin: "0" }}>{section?.code}</h2>
      {section?.times?.map((time) => {
        const location = time?.location;
        const instructors = time?.instructors;
        return (
          <div>
            <p style={{ margin: "0" }}>
              <b>{time?.day.slice(0, 3).toUpperCase()}: </b>
              {location ? time?.location : <></>} {time?.start / 3600 + ":00"}-
              {time?.end / 3600 + ":00"}
            </p>
            {instructors ? <i>{instructors.join(", ")}</i> : <></>}
          </div>
        );
      })}
    </div>
  );
}
