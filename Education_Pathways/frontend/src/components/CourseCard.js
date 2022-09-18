import React, { Component } from "react";
import "./css/coursecard.css";
import "bootstrap/dist/css/bootstrap.css";
import Col from 'react-bootstrap/Col'

// this function should:
// receive  a list of courses called wishlist_data from the database
// send modified comments to database. database saves it. the page rerenders to show the modified information

class CourseCard extends Component{

  render(){
    return (
      <div className={"course-card-render"}>
        {this.props.wishlist_data.map((course)=>(
          <a href={`/courseDetails/${course.code}`} className={"wishlist-link"}>
            <Col className={"text-center wishlist-card"}>
              <h5>
                {course.code}: {course.name}
              </h5>
            </Col>
          </a>
        ))} 
      </div>
    )
  }
}


export default CourseCard;
