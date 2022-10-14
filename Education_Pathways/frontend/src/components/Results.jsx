import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./css/Result.css";
import unstarred from "./img/star.png";

let star;

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_code: this.props.course_code,
      course_name: this.props.course_name,
      division: "Division of Computer Engineering",
      faculty: "Faculty of Applied Science and Engineering",
      starred: false,
      username: localStorage.getItem("username"),
    };
    star = unstarred;
  }

  redirectCourse = () => {
    this.props.history.push(`/course/details/${this.props.course_code}`, {
      course_code: this.props.course_code,
    });
  };

  render() {
    return (
      <Container>
        <a
          href={`courseDetails/${this.state.course_code}`}
          onClick={this.redirectCourse}
          className={"search-result-item"}
          style={{ textDecoration: "none" }}
        >
          <Row className={"result-display"}>
            <Col>
              <h5>{this.state.course_code}</h5>
            </Col>
            <Col>
              <h5>{this.state.course_name}</h5>
            </Col>
            <Col>{this.state.division}</Col>
            <Col>{this.state.faculty}</Col>
            {/* <Col><img src={star} alt=""/></Col> */}
          </Row>
        </a>
      </Container>
    );
  }
}

export default Result;
