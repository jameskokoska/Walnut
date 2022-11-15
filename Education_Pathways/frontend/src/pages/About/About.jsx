import React from "react";

import Searchbar from "../../components/Searchbar/Searchbar";

import "./About.scss";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-page-container">
        <div className="about-page-text">
          <h2>About Walnut</h2>
          <div style={{ height: "10px" }}></div>
          <h4>
            Walnut, a name which fits in the theme of “tree nuts” often used by
            the University of Toronto (Acorn and Chestnut Residence).
          </h4>
          <p>
            Walnut is a web application for current and future students at the
            University of Toronto, to efficiently search and select courses.
            Walnut has an intuitive user-interface, displaying helpful
            information and has features such as side-by-side course comparison
            that would aid the users to make good decisions. The primary
            benefits of Walnut are to provide adequate and useful information
            for students to make their decisions, and to improve the efficiency
            of the course selection process.
          </p>
        </div>
        <div style={{ height: "20px" }}></div>
        <div className="about-page-recipe">
          <h2>Walnut Recipe</h2>
          <p>
            Knowing how to use Walnut can help you find courses efficiently, and
            get the most out of course searching and course comparison. Walnut
            has a excellent search engine that guarentees to help you find the
            courses you want, and by following the searching conventions
            demonstrated below, you will definitely find exact courses you are
            looking for!
          </p>

          <div style={{ height: "10px" }}></div>

          <div className="recipes">
            <div style={{ width: "50%" }}>
              <h5>
                If you are familiar with course codes, directly search to get
                all information about a course
              </h5>
            </div>
            <div style={{ width: "50%", paddingLeft: "30px" }}>
              <Searchbar
                style={{ cursor: "pointer" }}
                inputArgs={{ disabled: "true", value: "ece444" }}
              />
            </div>
          </div>

          <div style={{ height: "20px" }}></div>

          <div className="recipes">
            <div style={{ width: "50%" }}>
              <h5>
                If you are not sure about course code but know the course name,
                search the name
              </h5>
            </div>
            <div style={{ width: "50%", paddingLeft: "30px" }}>
              <Searchbar
                style={{ cursor: "pointer" }}
                inputArgs={{ disabled: "true", value: "software engineering" }}
              />
            </div>
          </div>

          <div style={{ height: "20px" }}></div>

          <div className="recipes">
            <div style={{ width: "50%" }}>
              <h5>
                If you want to search all the courses starting with a code,
                simply search that code
              </h5>
            </div>
            <div style={{ width: "50%", paddingLeft: "30px" }}>
              <Searchbar
                style={{ cursor: "pointer" }}
                inputArgs={{ disabled: "true", value: "ece" }}
              />
            </div>
          </div>

          <div style={{ height: "20px" }}></div>

          <div className="recipes">
            <div style={{ width: "50%" }}>
              <h5>
                If you want to filter courses with specific keywords, separate
                them with spaces
              </h5>
            </div>
            <div style={{ width: "50%", paddingLeft: "30px" }}>
              <Searchbar
                style={{ cursor: "pointer" }}
                inputArgs={{
                  disabled: "true",
                  value: "ece csc python",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
