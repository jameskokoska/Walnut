import React from "react";
import { useState } from "react";
import "./CourseConnections.scss";
import { Flowpoint, Flowspace } from "flowpoints";

export default function CourseConnections({}) {
  const preColor = "#3E837F";
  const courseColor = "#1C3E6E";
  const afterColor = "#5C2C7E";
  const [flows, setFlows] = useState({
    ECE443: {
      pos: { x: 200 * 1, y: 100 * 0 },
      outputs: ["ECE444"],
      color: preColor,
    },
    ECE444: {
      pos: { x: 200 * 1, y: 100 * 1 },
      outputs: ["ECE445", "ECE446", "ECE447"],
      color: courseColor,
    },
    ECE445: {
      pos: { x: 200 * 1, y: 100 * 2 },
      outputs: ["ECE450"],
      color: afterColor,
    },
    ECE446: {
      pos: { x: 200 * 2, y: 100 * 2 },
      outputs: ["ECE451"],
      color: afterColor,
    },
    ECE447: {
      pos: { x: 200 * 3, y: 100 * 2 },
      outputs: ["ECE452", "ECE451"],
      color: afterColor,
    },
    ECE450: {
      pos: { x: 200 * 1, y: 100 * 3 },
      outputs: [],
      color: afterColor,
    },
    ECE451: {
      pos: { x: 200 * 2, y: 100 * 3 },
      outputs: [],
      color: afterColor,
    },
    ECE452: {
      pos: { x: 200 * 3, y: 100 * 3 },
      outputs: [],
      color: afterColor,
    },
  });

  return (
    <>
      <Legend />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Flowspace
          theme="purple"
          variant="filled"
          connectionSize={3}
          arrowStart={false}
          arrowEnd={true}
          background="transparent"
        >
          {Object.keys(flows).map((key) => {
            const point = flows[key];
            const totalOutputs = {};
            for (let output of point.outputs) {
              totalOutputs[output] = { input: "top" };
            }
            return (
              <Flowpoint
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
              >
                {key}
              </Flowpoint>
            );
          })}
        </Flowspace>
      </div>
    </>
  );
}

export function Legend({}) {
  return <></>;
}
