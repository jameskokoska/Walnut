import React, { useState, useEffect } from "react";

import Searchbar from "../../components/Searchbar/Searchbar";
import Profile from "../../components/Profile/Profile";
import KL from "../../components/img/KL.jpeg";
import JK from "../../components/img/JK.jpeg";
import MK from "../../components/img/MK.jpeg";
import MA from "../../components/img/MA.jpeg";
import SP from "../../components/img/SP.jpeg";

import "./About.scss";

const profileData = [
  [
    {
      url: KL,
      name: "Kevin Li",
      text: (
        <p>
          A Full Stack
          <span style={{ textDecoration: "line-through", color: "#8198B8" }}>
            Overflow
          </span>{" "}
          Developer
        </p>
      ),
      link: "https://www.linkedin.com/in/tian-kevin-li/",
    },
    {
      url: JK,
      name: "James Kokoska",
      text: <p>Time to become a middle end developer</p>,
      link: "https://www.linkedin.com/in/jameskokoska/",
    },
    {
      url: MK,
      name: "Markus Kunej",
      text: <p>Backend developer with a nice back end</p>,
      link: "https://www.linkedin.com/in/markuskunej/",
    },
  ],
  [
    {
      url: MA,
      name: "Mohammad Ahmed",
      text: <p>This was fun and a great learning experience</p>,
      link: "https://www.linkedin.com/in/mohammad-ahmed26/",
    },
    {
      url: SP,
      name: "Sam Pan",
      text: (
        <p>
          As a rookie in web development before this project, Sam now feels like
          he has the tools to reinvent Google and Amazon
        </p>
      ),
      link: "https://www.linkedin.com/in/sam-pan-310618201/",
    },
  ],
];

export default function AboutPage() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="about-page">
      <div className="about-page-container">
        <div
          style={
            windowSize > 768
              ? { width: "60%", margin: "0 auto" }
              : { width: "80%", margin: "0 auto" }
          }
        >
          <div className="about-page-text">
            <h2>About Walnut</h2>
            <h4>
              Walnut, a name which fits in the theme of “tree nuts” often used
              by the University of Toronto (Acorn and Chestnut Residence).
            </h4>
            <p>
              Walnut is a web application for current and future students at the
              University of Toronto, to efficiently search and select courses.
              Walnut has an intuitive user-interface, displaying helpful
              information and has features such as side-by-side course
              comparison that would aid the users to make good decisions. The
              primary benefits of Walnut are to provide adequate and useful
              information for students to make their decisions, and to improve
              the efficiency of the course selection process.
            </p>
          </div>

          <div style={{ height: "20px" }}></div>

          <div>
            <h2>Walnut Recipe</h2>
            <p>
              Knowing how to use Walnut can help you find courses efficiently,
              and get the most out of course searching and course comparison.
              Walnut has a excellent search engine that guarentees to help you
              find the courses you want, and by following the searching
              conventions demonstrated below, you will definitely find exact
              courses you are looking for!
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
                  inputArgs={{ disabled: true, value: "ece444" }}
                />
              </div>
            </div>

            <div style={{ height: "20px" }}></div>

            <div className="recipes">
              <div style={{ width: "50%" }}>
                <h5>
                  If you are not sure about course code but know the course
                  name, search the name
                </h5>
              </div>
              <div style={{ width: "50%", paddingLeft: "30px" }}>
                <Searchbar
                  style={{ cursor: "pointer" }}
                  inputArgs={{ disabled: true, value: "software engineering" }}
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
                  inputArgs={{ disabled: true, value: "ece" }}
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
                    disabled: true,
                    value: "ece csc python",
                  }}
                />
              </div>
            </div>

            <div style={{ height: "20px" }}></div>

            <div className="recipes">
              <div style={{ width: "50%" }}>
                <h5>
                  If you have no idea at all, just go for whatever comes to your
                  mind!
                </h5>
              </div>
              <div style={{ width: "50%", paddingLeft: "30px" }}>
                <Searchbar
                  style={{ cursor: "pointer" }}
                  inputArgs={{
                    disabled: true,
                    value: "programming",
                  }}
                />
              </div>
            </div>

            <div style={{ height: "30px" }}></div>

            <p>
              Walnut supports shortcut searches such as searching art and
              science breadth as br1, br2, ... or engineering complementary
              courses and humanity & social science as cs and hss. Try some
              other shortcuts, they might work!
            </p>

            <p>
              If you feel like saving a course for later lookup or comparison,
              you can always add it to your favourites by clicking the heart
              button to light it up, you can access all saved courses by using
              the heart button on the top right of the webpage.
            </p>
            <p>
              If you want to compare two courses, simply go into one course's
              specific information page, then use the top left button and search
              another course to compare with it
            </p>
          </div>

          <div style={{ height: "20px" }}></div>

          <div>
            <h2>Our Team</h2>
            <div style={{ height: "20px" }}></div>
            <div className="team-profiles1">
              {profileData[0].map((profile) => (
                <Profile
                  key={profile.url}
                  img={profile.url}
                  name={profile.name}
                  text={profile.text}
                  link={profile.link}
                  style={{ width: "30%" }}
                />
              ))}
            </div>
            <div style={{ height: "20px" }}></div>
            <div className="team-profiles2">
              {profileData[1].map((profile) => (
                <Profile
                  key={profile.url}
                  img={profile.url}
                  name={profile.name}
                  text={profile.text}
                  link={profile.link}
                  style={{ width: "30%" }}
                />
              ))}
            </div>
          </div>
          <div style={{ height: "30px" }}></div>
          <div className="about-page-footer">
            Copyright © 2022 Walnut. All rights reserved.
          </div>
          <div style={{ height: "20px" }}></div>
        </div>
      </div>
    </div>
  );
}
