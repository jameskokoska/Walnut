import React, { useEffect, useState } from "react";
import "./css/course-description.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import requisite_label from "./img/requisite-label.png";
import empty_star from "./img/star.png";
import { useParams } from "react-router-dom";
import API from "../api";

let star = empty_star;

export default function CourseDescriptionPage() {
  const { code } = useParams();

  const [courseState, setCourseState] = useState({
    course_code: "",
    course_name: "",
    division: "Faculty of Applied Science and Engineering",
    department:
      "Department of Edward S. Rogers Sr. Dept. of Electrical & Computer Engineering",
    graph: "",
    course_description: "",
    syllabus: "",
    prerequisites: "",
    corequisites: "",
    exclusions: "",
    starred: false,
    graphics: [],
    username: localStorage.getItem("username"),
  });

  useEffect(() => {
    console.log("pass in course code: ", code);

    API.get(`/course/details?code=${code}`, {
      // code: this.props.course_code
      code: code,
    }).then((res) => {
      console.log(res.data);

      const courseStateCopy = { ...courseState };
      courseStateCopy["course_code"] = res.data.course.code;
      courseStateCopy["course_name"] = res.data.course.name;
      courseStateCopy["course_description"] = res.data.course.description;
      courseStateCopy["graph"] = res.data.course.graph;

      let prereq_len = res.data.course.prereq.length;
      if (prereq_len > 1) {
        let prereq_str = "";
        for (let i = 0; i < prereq_len; i++) {
          prereq_str += res.data.course.prereq[i];
          if (i !== prereq_len - 1) {
            prereq_str += ", ";
          }
        }
        // this.setState({prerequisites : prereq_str})
        courseStateCopy["prerequisites"] = prereq_str;
      } else {
        // this.setState({prerequisites : res.data.course.prereq})
        courseStateCopy["prerequisites"] = res.data.course.prereq;
      }
      let coreq_len = res.data.course.coreq.length;
      if (coreq_len > 1) {
        let coreq_str = "";
        for (let i = 0; i < coreq_str; i++) {
          coreq_str += res.data.course.coreq[i];
          if (i !== coreq_len - 1) {
            coreq_str += ", ";
          }
        }
        // this.setState({corequisites : coreq_str})
        courseStateCopy["corequisites"] = coreq_str;
      } else {
        // this.setState({corequisites : res.data.course.coreq})
        courseStateCopy["corequisites"] = res.data.course.coreq;
      }
      let exclusion_len = res.data.course.exclusion.length;
      if (exclusion_len > 1) {
        let exclusion_str = "";
        for (let i = 0; i < exclusion_str; i++) {
          exclusion_str += res.data.course.exclusion[i];
          if (i !== exclusion_len - 1) {
            exclusion_str += ", ";
          }
        }
        // this.setState({exclusions : exclusion_str})
        courseStateCopy["exclusions"] = exclusion_str;
      } else {
        // this.setState({exclusions : res.data.course.exclusion})
        courseStateCopy["exclusions"] = res.data.course.exclusion;
      }
      let syllabus_link = "http://courses.skule.ca/course/" + code;
      // this.setState({syllabus : syllabus_link})
      courseStateCopy["syllabus"] = syllabus_link;

      let temp_graph = [];
      //temp_graph.push(<ShowGraph graph_src={courseState.graph}></ShowGraph>)
      // this.setState({graphics: temp_graph})
      courseStateCopy["graphics"] = temp_graph;

      setCourseState(courseStateCopy);
    });
  }, []);

  const openLink = () => {
    const newWindow = window.open(
      courseState.syllabus,
      "_blacnk",
      "noopener,noreferrer"
    );
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className="page-content">
      <Container className="course-template">
        <Row float="center" className="course-title">
          <Col xs={8}>
            <h1>
              {courseState.course_code} : {courseState.course_name}
            </h1>
          </Col>
          {/* <Col xs={4}>
            <img src={star} onClick={this.check_star} alt="" />
          </Col> */}
        </Row>
        <Row>
          <Col className="col-item">
            <h3>Division</h3>
            <p>{courseState.division}</p>
          </Col>
          <Col className="col-item">
            <h3>Department</h3>
            <p>{courseState.department}</p>
          </Col>
          <Col className="col-item">
            <h3>Past Tests and Syllabi</h3>
            <button className={"syllabus-link"} onClick={openLink}>
              View
            </button>
          </Col>
        </Row>
        <Row className="col-item course-description">
          <h3>Course Description</h3>
          <p>{courseState.course_description}</p>
        </Row>
        <Row className="col-item course-requisite">
          <Row>
            <h3>Course Requisites</h3>
          </Row>
          <Row>
            <Col className="requisites-display">
              <h4>Pre-Requisites</h4>
              <p>{courseState.prerequisites}</p>
            </Col>
            <Col className="requisites-display">
              <h4>Co-Requisites</h4>
              <p>{courseState.corequisites}</p>
            </Col>
            <Col className="requisites-display">
              <h4>Exclusion</h4>
              <p>{courseState.exclusions}</p>
            </Col>
          </Row>
          <Row>
            <div className={"req-graph"}>
              <img
                style={{ width: "70%", marginBottom: "3%" }}
                alt=""
                src={requisite_label}
              ></img>
              <img
                src={`data:image/jpeg;base64,${courseState.graph}`}
                alt=""
              ></img>
            </div>
          </Row>
        </Row>
      </Container>
    </div>
  );
}
