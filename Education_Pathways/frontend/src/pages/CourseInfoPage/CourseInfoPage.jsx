import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CourseInfoSideBar from "../../components/CourseInfoSideBar/CourseInfoSideBar";
import "./CourseInfoPage.css";

export default function CourseInfoPage() {
  const { code } = useParams();
  const [section, setSection] = useState([true, false, false, false]);

  const onTabClick = (idx) => {
    let newSection = [false, false, false, false];
    newSection[idx] = true;
    setSection(newSection);
  };

  return (
    <div className="courseInfo-page">
      <div className="courseInfo-sidebar">
        <h1>{code}</h1>
        <CourseInfoSideBar section={section} onClick={onTabClick} />
      </div>
      <div className="courseInfo-main">
        <div style={{ display: section[0] ? "block" : "none" }}>Info</div>
        <div style={{ display: section[1] ? "block" : "none" }}>Review</div>
        <div style={{ display: section[2] ? "block" : "none" }}>Prof</div>
        <div style={{ display: section[3] ? "block" : "none" }}>Exam</div>
      </div>
    </div>
  );
}
