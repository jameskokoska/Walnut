import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './css/Label.css'

//header for SearchResultsDisplay
class Label extends Component{

  constructor(props) {
    super(props);
    this.state = {
      course_code : "Course Code",
      course_name: "Course Name",
      division: "Division",
      faculty: "Faculty",
      starred: "Status"
    };
  }

  render(){
    return (
      <Container>
        <Row className={"label"}>
            <Col>
                <h5>{this.state.course_code}</h5>  
            </Col>
            <Col>
                <h5>{this.state.course_name}</h5>
            </Col>
            <Col><h5>{this.state.division}</h5></Col>
            <Col><h5>{this.state.faculty}</h5></Col>
            {/* <Col><h5>{this.state.starred}</h5></Col> */}
        </Row>
      </Container>
    );
  }
}

export default Label;
