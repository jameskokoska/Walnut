import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseInfoSideBar from "../../components/CourseInfoSideBar/CourseInfoSideBar";
import API from "../../api";
import "./CourseInfoPage.css";

export default function CourseInfoPage() {
  const { code } = useParams();
  const [section, setSection] = useState([true, false, false, false]);
  const [courseState, setCourseState] = useState({
    course_code: "",
    course_name: "",
    division: "",
    department: "",
    course_description: "",
    prerequisites: "",
    course_level: "",
    campus: "",
    terms: "",
    corequisites: "",
    recommeded_prep: "",
    breadth: "",
    distribution: "",
    exclusions: "",
  });
  const navigate = useNavigate();

  const onTabClick = (idx) => {
    let newSection = [false, false, false, false];
    newSection[idx] = true;
    setSection(newSection);
  };

  useEffect(() => {
    API.get(`/course/details?code=${code}`)
      .then((res) => {
        const data = res.data.course;
        console.log(data);
        setCourseState({
          course_code: data.code,
          course_name: data.name,
          division: data.division,
          department: data.department,
          course_description: data.description,
          prerequisites: "data.prereq",
          course_level: data.level,
          campus: data.campus,
          terms: data.term,
          corequisites: data.coreq,
          recommeded_prep: data.prep,
          breadth: data.br,
          distribution: data.dist,
          exclusions: data.exclusion,
        });
      })
      .catch((err) => {
        console.log(err);
        navigate("/course-not-found");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="courseInfo-page">
      <div className="courseInfo-sidebar">
        <h1>{courseState.course_code}</h1>
        <h3>{courseState.course_name}</h3>
        <CourseInfoSideBar section={section} onClick={onTabClick} />
      </div>
      <div className="courseInfo-main">
        <div style={{ display: section[0] ? "block" : "none" }}>
          <h1>Overview</h1>
          <p>{courseState.course_description}</p>
        </div>
        <div style={{ display: section[1] ? "block" : "none" }}>Review</div>
        <div style={{ display: section[2] ? "block" : "none" }}>Prof</div>
        <div style={{ display: section[3] ? "block" : "none" }}>Exam</div>
      </div>
    </div>
  );
}
