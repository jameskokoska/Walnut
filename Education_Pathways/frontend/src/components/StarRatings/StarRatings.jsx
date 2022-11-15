import React from "react";
import "./StarRatings.scss";

import OutlinedStar from "../../components/img/heart-regular.svg";
import FilledStar from "../../components/img/heart-fill-blue.svg";

export default function StarRatings({ width, height, rating, onClick, label }) {
  return (
    <div
      style={{
        width: width + "px",
        height: height + "px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: width + "px",
          height: width * 0.2,
          display: "flex",
          flexDirection: "row",
          position: "absolute",
        }}
      >
        <img
          alt={"rating"}
          className={"star-rating"}
          style={{
            height: width * 0.2 + "px",
            width: width / 5 + "px",
          }}
          src={OutlinedStar}
          onClick={() => onClick(1)}
        />
        <img
          alt={"rating"}
          className={"star-rating"}
          style={{
            height: width * 0.2 + "px",
            width: width / 5 + "px",
          }}
          src={OutlinedStar}
          onClick={() => onClick(2)}
        />
        <img
          alt={"rating"}
          className={"star-rating"}
          style={{
            height: width * 0.2 + "px",
            width: width / 5 + "px",
          }}
          src={OutlinedStar}
          onClick={() => onClick(3)}
        />
        <img
          alt={"rating"}
          className={"star-rating"}
          style={{
            height: width * 0.2 + "px",
            width: width / 5 + "px",
          }}
          src={OutlinedStar}
          onClick={() => onClick(4)}
        />
        <img
          alt={"rating"}
          className={"star-rating"}
          style={{
            height: width * 0.2 + "px",
            width: width / 5 + "px",
          }}
          onClick={() => onClick(5)}
          src={OutlinedStar}
        />
      </div>
      <div
        style={{
          width: (width * rating) / 5,
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <div
          className="ratingContainer"
          style={{ width: width + "px", height: width * 0.2 }}
        >
          <img
            alt={"rating"}
            className={"star-rating"}
            style={{
              height: width * 0.2 + "px",
              width: width / 5 + "px",
            }}
            src={FilledStar}
            onClick={() => onClick(1)}
          />
          <img
            alt={"rating"}
            className={"star-rating"}
            style={{
              height: width * 0.2 + "px",
              width: width / 5 + "px",
            }}
            src={FilledStar}
            onClick={() => onClick(2)}
          />
          <img
            alt={"rating"}
            className={"star-rating"}
            style={{
              height: width * 0.2 + "px",
              width: width / 5 + "px",
            }}
            src={FilledStar}
            onClick={() => onClick(3)}
          />
          <img
            alt={"rating"}
            className={"star-rating"}
            style={{
              height: width * 0.2 + "px",
              width: width / 5 + "px",
            }}
            src={FilledStar}
            onClick={() => onClick(4)}
          />
          <img
            alt={"rating"}
            className={"star-rating"}
            style={{
              height: width * 0.2 + "px",
              width: width / 5 + "px",
            }}
            src={FilledStar}
            onClick={() => onClick(5)}
          />
        </div>
      </div>
      <p
        style={{
          paddingTop: 40 + "px",
          textAlign: "center",
          width: width + "px",
        }}
      >
        {label}
      </p>
    </div>
  );
}
