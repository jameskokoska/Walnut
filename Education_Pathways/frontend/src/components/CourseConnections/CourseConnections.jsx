import React from "react";
import { useState, useEffect } from "react";
import "./CourseConnections.scss";
import { Flowpoint, Flowspace } from "flowpoints";
import { Link, useNavigate } from "react-router-dom";

function parseCourseCodes(string) {
  if (string) {
    let re = /[a-zA-Z]{3}\d{3}[a-zA-Z]{1}\d{1}/g;
    return [...new Set(string.match(re))];
  } else {
    return [];
  }
}

export default function CourseConnections({ course }) {
  const navigate = useNavigate();

  const preColor = "#3E837F";
  const courseColor = "#1C3E6E";
  const afterColor = "#5C2C7E";
  const recColor = "#B7B754";
  const excColor = "#B75454";
  const pointTypeString = {
    pre: "Prerequisite",
    co: "Corequisite",
    rec: "Recommended",
    exc: "Exclusion",
  };

  useEffect(() => {
    if (course) {
      const stateObject = {};
      const currentCourse = course.course_code;
      const rec = parseCourseCodes(course?.recommeded_prep);
      const pre = parseCourseCodes(course?.prerequisites);
      const co = parseCourseCodes(course?.corequisites);
      const exc = parseCourseCodes(course?.exclusions);

      let currentLevel = 0;
      if (rec && rec.length > 0) {
        for (let i = 0; i < rec.length; i++) {
          stateObject[rec[i]] = {
            pos: { x: 200 * i, y: 85 * currentLevel },
            outputs: [currentCourse],
            color: recColor,
            type: "rec",
          };
        }
        currentLevel++;
      }

      if (pre && pre.length > 0) {
        for (let i = 0; i < pre.length; i++) {
          stateObject[pre[i]] = {
            pos: { x: 200 * i, y: 85 * currentLevel },
            outputs: [currentCourse],
            color: preColor,
            type: "pre",
          };
        }
        currentLevel++;
      }
      stateObject[currentCourse] = {
        pos: { x: 200 * 0, y: 85 * currentLevel },
        outputs: [...co, ...exc],
        color: courseColor,
      };
      currentLevel++;
      if (co && co.length > 0) {
        for (let i = 0; i < co.length; i++) {
          stateObject[co[i]] = {
            pos: { x: 200 * (i + 1), y: 85 * currentLevel },
            outputs: [],
            color: afterColor,
            type: "co",
          };
        }
        currentLevel++;
      }

      if (exc && exc.length > 0) {
        for (let i = 0; i < exc.length; i++) {
          stateObject[exc[i]] = {
            pos: { x: 200 * i, y: 85 * currentLevel },
            outputs: [],
            color: excColor,
            type: "exc",
          };
        }
        currentLevel++;
      }
      setFlows(stateObject);
      if (currentLevel > 1) {
        setShowFlows(true);
      }
    }
  }, [course]);

  const [flows, setFlows] = useState({});
  const [showFlows, setShowFlows] = useState(false);

  return (
    <>
      {!showFlows ? (
        <></>
      ) : (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="nodrag"
        >
          <Flowspace
            theme="purple"
            variant="filled"
            connectionSize={3}
            arrowStart={false}
            arrowEnd={true}
            background="transparent"
            className="nodrag"
          >
            {Object.keys(flows).map((key) => {
              const exc = parseCourseCodes(course?.exclusions);
              const point = flows[key];
              const totalOutputs = {};
              for (const output of point.outputs) {
                totalOutputs[output] = {
                  input: "top",
                  inputColor: exc.includes(output)
                    ? "#e01017"
                    : point.type === "rec"
                    ? "#ffd53d"
                    : "",
                  outputColor: exc.includes(output)
                    ? "#9A1B1B"
                    : point.type === "rec"
                    ? "#f78f2d"
                    : "",
                };
              }
              return (
                <Flowpoint
                  className="nodrag"
                  key={key}
                  snap={{ x: 5, y: 5 }}
                  startPosition={{ x: point.pos.x, y: point.pos.y + 70 }}
                  outputs={totalOutputs}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRadius: 15,
                    boxShadow: "0px 3px 6px 5px #2E2E2E2B",
                    cursor: "pointer",
                    backgroundColor: point.color,
                    border: "none",
                  }}
                  dragX={false}
                  dragY={false}
                  selected={false}
                  onTouch={() => {
                    navigate(`/courseinfo/${key}`);
                  }}
                  theme="black"
                >
                  <Link
                    to={`/courseinfo/${key}`}
                    className="link"
                    style={{ color: "white" }}
                  >
                    {key}
                    <p style={{ margin: 0, fontSize: "10px", color: "white" }}>
                      {pointTypeString[point.type]}
                    </p>
                  </Link>
                </Flowpoint>
              );
            })}
          </Flowspace>
        </div>
      )}
    </>
  );
}
