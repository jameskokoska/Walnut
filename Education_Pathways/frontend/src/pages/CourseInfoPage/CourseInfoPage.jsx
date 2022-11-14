import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseInfoSideBar from "../../components/CourseInfoSideBar/CourseInfoSideBar";
import API from "../../api";
import "./CourseInfoPage.scss";
import "./comparison.scss";
import CourseConnections from "../../components/CourseConnections/CourseConnections";
import Button from "../../components/Button/Button";
import Searchbar from "../../components/Searchbar/Searchbar";


export default function CourseInfoPage() {
  const { code } = useParams();
  const [section, setSection] = useState([true, false, false, false]);
  const [compare, setCompare] = useState(false);

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
    meeting_sections: "",
    last_updated: "",
  });
  const [courseCompareState, setCourseCompareState] = useState({
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
    meeting_sections: "",
    last_updated: "",
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

  const setCourseCompare = (compareCode) => {
    API.get(`/course/details?code=${compareCode}`)
      .then((res) => {
        const data = res.data;
        setCourseCompareState({
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
  } 

  const courseInfo = (courseCompare) => {
    return <>
      <div style={{ display: section[0] ? "block" : "none" }}>
        <div style={{ height: "120px" }} />
        <h1>Overview</h1>
        <h4>{`Department: ${courseCompare.department}`}</h4>
        <h4>{`Campus: ${courseCompare.campus}`}</h4>
        <h4>{`Term: ${courseCompare.terms}`}</h4>
        <h4>{`Prerequisites: ${
          courseCompare.prerequisites ? courseCompare.prerequisites : "None"
        }`}</h4>
        <h4>{`Corequisites: ${
          courseCompare.corequisites ? courseCompare.corequisites : "None"
        }`}</h4>
        <h4>{`Exclusions: ${
          courseCompare.exclusions ? courseCompare.exclusions : "None"
        }`}</h4>
        <p>{courseCompare.course_description}</p>
        <CourseConnections course={courseCompare} />
        </div>
      <div style={{ display: section[1] ? "block" : "none" }}>Review</div>
      <div style={{ display: section[2] ? "block" : "none" }}>Prof</div>
      <div style={{ display: section[3] ? "block" : "none" }}>Exam</div>
    </>
  }

  return (
    
    // onClick={() => setCollapse((prev) => !prev)}, onClick={()=>{setCompare(!compare)}}
    <div className="courseInfo-page">
      <div className="courseInfo-sidebar">
        <Button isSecondary style={{width:"250px"}} label={"compare"} onClick={()=>{setCompare(!compare)}} />
        <h1>{courseState.course_code}</h1>
        <h3>{courseState.course_name}</h3>
        <CourseInfoSideBar section={section} onClick={onTabClick} />
      </div>
      {!compare ? <div className="courseInfo-main">{courseInfo(courseState)}</div> : <>
        <div className="courseInfo-main" style={{width:"50%"}}>{courseInfo(courseState)}</div>
        <div className="courseInfo-main" style={{width:"50%", paddingLeft:"15px"}}>
        <Searchbar onEnterKey={(text)=>{setCourseCompare(text)}}/>

          {courseCompareState?.course_code === "" ? <></> : courseInfo(courseCompareState)}
        </div>
      </>}
    </div>
    
  );



}
