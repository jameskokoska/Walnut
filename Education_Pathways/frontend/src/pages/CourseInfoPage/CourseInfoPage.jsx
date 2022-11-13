import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CourseInfoSideBar from "../../components/CourseInfoSideBar/CourseInfoSideBar";
import API from "../../api";
import "./CourseInfoPage.scss";
import CourseConnections from "../../components/CourseConnections/CourseConnections";
import Loading from "../../components/Loading/Loading";

export default function CourseInfoPage() {
  const { code } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [section, setSection] = useState([true, false, false, false]);
  const [courseState, setCourseState] = useState();

  const onTabClick = (idx) => {
    let newSection = [false, false, false, false];
    newSection[idx] = true;
    setSection(newSection);
  };

  useEffect(() => {
    const coursePassed = state?.course;
    if (coursePassed) {
      setCourseState({
        course_code: coursePassed.code,
        course_name: coursePassed.name,
        division: coursePassed.division,
        department: coursePassed.department,
        course_description: coursePassed.description,
        prerequisites: coursePassed.prerequisites,
        course_level: coursePassed.level,
        campus: coursePassed.campus,
        terms: coursePassed.term,
        corequisites: coursePassed.corequisites,
        recommeded_prep: coursePassed.recommended_preparation,
        breadth: coursePassed.arts_and_science_breadth,
        distribution: coursePassed.utm_distribution,
        exclusions: coursePassed.exclusions,
        meeting_sections: coursePassed.meeting_sections,
        last_updated: coursePassed.last_updated,
      });
      return;
    }
    API.get(`/course/details?code=${code}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCourseState({
          course_code: data.code,
          course_name: data.name,
          division: data.division,
          department: data.department,
          course_description: data.description,
          prerequisites: data.prerequisites,
          course_level: data.level,
          campus: data.campus,
          terms: data.term,
          corequisites: data.corequisites,
          recommeded_prep: data.recommended_preparation,
          breadth: data.arts_and_science_breadth,
          distribution: data.utm_distribution,
          exclusions: data.exclusions,
          meeting_sections: data.meeting_sections,
          last_updated: data.last_updated,
        });
      })
      .catch(() => {
        navigate("course-not-found");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return courseState ? (
    <div className="courseInfo-page">
      <div className="courseInfo-sidebar">
        <h1>{courseState.course_code}</h1>
        <h3>{courseState.course_name}</h3>
        <CourseInfoSideBar section={section} onClick={onTabClick} />
      </div>
      <div className="courseInfo-main">
        <div style={{ display: section[0] ? "block" : "none" }}>
          <div style={{ height: "120px" }} />
          <h1>Overview</h1>
          <h4>{`Department: ${courseState.department}`}</h4>
          <h4>{`Campus: ${courseState.campus}`}</h4>
          <h4>{`Term: ${courseState.terms}`}</h4>
          <h4>{`Prerequisites: ${
            courseState.prerequisites ? courseState.prerequisites : "None"
          }`}</h4>
          <h4>{`Corequisites: ${
            courseState.corequisites ? courseState.corequisites : "None"
          }`}</h4>
          <h4>{`Exclusions: ${
            courseState.exclusions ? courseState.exclusions : "None"
          }`}</h4>
          <p>{courseState.course_description}</p>
          <CourseConnections course={courseState} />
        </div>
        <div style={{ display: section[1] ? "block" : "none" }}>Review</div>
        <div style={{ display: section[2] ? "block" : "none" }}>Prof</div>
        <div style={{ display: section[3] ? "block" : "none" }}>Exam</div>
      </div>
    </div>
  ) : (
    <div className="courseInfo-page">
      <div className="courseInfo-sidebar">
        <h1>{courseState?.course_code}</h1>
        <h3>{courseState?.course_name}</h3>
        <CourseInfoSideBar section={section} onClick={onTabClick} />
      </div>
      <div className="courseInfo-main">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Loading />
          <p style={{ marginTop: "20px" }}>Loading...</p>
        </div>
      </div>
    </div>
  );
}
