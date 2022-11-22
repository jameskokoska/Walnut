import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../../api";

import CourseInfoSideBar from "../../components/CourseInfoSideBar/CourseInfoSideBar";
import CourseConnections from "../../components/CourseConnections/CourseConnections";
import Button from "../../components/Button/Button";
import Searchbar from "../../components/Searchbar/Searchbar";
import SearchResults from "../SearchResults/SearchResults";
import Favorites from "../Favorites/Favorites";
import Compare from "../../components/img/compare.svg";
import CompareEnabled from "../../components/img/compareEnabled.svg";
import TimetableSectionContainer from "../../components/TimetableSectionContainer/TimetableSectionContainer";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import Loading from "../../components/Loading/Loading";
import StarRatings from "../../components/StarRatings/StarRatings";

import "./CourseInfoPage.scss";

const emptyCourse = {
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
  ratings: {
    difficulty: { rating: 0, amount: 0 },
    lecture: { rating: 0, amount: 0 },
    workload: { rating: 0, amount: 0 },
    tutorials: { rating: 0, amount: 0 },
  },
  comments: [],
};

export default function CourseInfoPage() {
  const { code } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [commentName, setCommentName] = useState(false);
  const [commentComment, setCommentComment] = useState(false);
  const [section, setSection] = useState([true, false, false, false]);
  const [compare, setCompare] = useState(false);
  const [searchCompare, setSearchCompare] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [courseState, setCourseState] = useState(emptyCourse);
  const [courseCompareState, setCourseCompareState] = useState(emptyCourse);
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [submitComment, setSubmitComment] = useState(false);
  const [ratingState, setRatingState] = useState({});

  const onTabClick = (idx) => {
    let newSection = [false, false, false, false];
    newSection[idx] = true;
    setSection(newSection);
  };

  const rateCourse = (value, courseCode, type) => {
    // Immediately render the updated frontend
    let rating = parseInt(ratingState[courseCode][type]["rating"]);
    let amount = parseInt(ratingState[courseCode][type]["amount"]);
    let totalRating = rating * amount;
    let newRating = (totalRating + value) / (amount + 1);
    let prevState = { ...ratingState };
    prevState[courseCode][type]["rating"] = newRating;
    prevState[courseCode][type]["amount"] = amount + 1;
    setRatingState(prevState);

    // Submit the rating to backend here
    API.post("/course/addrating", { courseCode, value, type }).then((res) => {
      console.log(res);
    });
  };

  const leaveComment = async (courseCode) => {
    const commentDate = new Date().toISOString();
    const commentObj = {
      name: commentName,
      comment: commentComment,
      time: commentDate,
    };

    // Submit the comment to backend here
    API.post(`/course/addreview?code=${courseCode}`, commentObj).then((res) => {
      console.log(res);
    });

    if (courseState?.course_code === courseCode) {
      courseState?.comments.unshift(commentObj);
      setCourseState(courseState);
      setSubmitComment(false);
      setCommentComment("");
    } else if (courseCompareState?.course_code === courseCode) {
      courseCompareState?.comments.unshift(commentObj);
      setCourseCompareState(courseCompareState);
      setSubmitComment(false);
      setCommentComment("");
    }
  };

  const setRatingStateHelper = (code, ratings) => {
    let newRatingState = { ...ratingState };
    if (!(code in newRatingState)) {
      newRatingState[code] = {
        difficulty: { rating: 0, amount: 0 },
        lecture: { rating: 0, amount: 0 },
        workload: { rating: 0, amount: 0 },
        tutorial: { rating: 0, amount: 0 },
      };
    }

    newRatingState[code]["difficulty"]["rating"] = parseFloat(
      ratings["difficulty"]
    );
    newRatingState[code]["difficulty"]["amount"] = parseFloat(
      ratings["amount"][0]
    );

    newRatingState[code]["lecture"]["rating"] = parseFloat(ratings["lecture"]);
    newRatingState[code]["lecture"]["amount"] = parseFloat(
      ratings["amount"][1]
    );

    newRatingState[code]["workload"]["rating"] = parseFloat(
      ratings["workload"]
    );
    newRatingState[code]["workload"]["amount"] = parseFloat(
      ratings["amount"][2]
    );

    newRatingState[code]["tutorial"]["rating"] = parseFloat(
      ratings["tutorial"]
    );
    newRatingState[code]["tutorial"]["amount"] = parseFloat(
      ratings["amount"][3]
    );

    setRatingState(newRatingState);
  };

  useEffect(async () => {
    const coursePassed = state?.course;
    if (coursePassed) {
      let ratings, comments;

      //get ratings
      await API.get(`/course/addrating?code=${coursePassed.code}`).then(
        (res) => {
          ratings = res.data.ratings;
          setRatingStateHelper(coursePassed.code, ratings);
        }
      );

      //get comments
      await API.get(`/course/addreview?code=${coursePassed.code}`).then(
        (res) => {
          comments = res.data.comments;
        }
      );

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
        ratings: ratings,
        comments: comments?.reverse(),
      });
      return;
    }
    API.get(`/course/details?code=${code}`)
      .then((res) => {
        const data = res.data;
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
          // we need to get the comments and ratings here
          ratings: data.ratings,
          comments: data.comments?.reverse(),
        });

        setRatingStateHelper(data.code, data.ratings);
      })
      .catch(() => {
        navigate("course-not-found");
      });
  }, []);

  const setCourseCompare = async (compareCode) => {
    setSearchCompare(false);
    await API.get(`/course/details?code=${compareCode}`)
      .then((res) => {
        const data = res.data;
        setRatingStateHelper(data.code, data.ratings);
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
          ratings: data.ratings,
          comments: data.comments?.reverse(),
        });
      })
      .catch(() => {
        setSearchCompare(compareCode);
      });
  };

  const setCourse = (data) => {
    setSearchCompare(false);
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
      ratings: data.ratings,
      comments: data.comments?.reverse(),
    });
  };

  const courseInfo = (courseCompare) => {
    return (
      <>
        <div style={{ display: section[0] ? "block" : "none" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ marginBottom: 0 }}>{courseCompare.course_code}</h1>{" "}
            <div style={{ width: "10px" }} />{" "}
            <FavoriteButton courseCode={courseCompare.course_code} />
          </div>
          <h2>{courseCompare.course_name}</h2>
          <h4 style={{ fontSize: "20px" }}>
            <b>{`${courseCompare.department}`}</b>
          </h4>
          <h4 style={{ fontSize: "20px" }}>
            <b>{`${courseCompare.campus} campus, ${courseCompare.terms}`}</b>
          </h4>
          {courseCompare.breadth ? (
            <h4 style={{ fontSize: "20px" }}>
              A&S Breadth {courseCompare.breadth}
            </h4>
          ) : (
            <></>
          )}

          <p className="course-description">
            {courseCompare.course_description}
          </p>
          <CourseConnections course={courseCompare} />
        </div>
        <div style={{ display: section[1] ? "block" : "none" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ marginBottom: 0 }}>{courseCompare.course_code}</h1>{" "}
            <div style={{ width: "10px" }} />{" "}
            <FavoriteButton courseCode={courseCompare.course_code} />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div className="rating-section-container">
              <p>Click a rating to rate this course!</p>
              <h2 style={{ margin: 0 }}>Difficulty</h2>
              <StarRatings
                rating={
                  ratingState[courseCompare.course_code]["difficulty"]["rating"]
                }
                width={200}
                onClick={(value) => {
                  if (
                    localStorage.getItem(`${courseCompare?.course_code}`) ==
                    null
                  ) {
                    localStorage.setItem(
                      `${courseCompare?.course_code}`,
                      JSON.stringify([true, false, false, false])
                    );
                    rateCourse(
                      value,
                      courseCompare["course_code"],
                      "difficulty"
                    );
                  } else {
                    const rated = JSON.parse(
                      localStorage.getItem(`${courseCompare?.course_code}`)
                    );
                    if (!rated[0]) {
                      rated[0] = true;
                      localStorage.setItem(
                        `${courseCompare?.course_code}`,
                        JSON.stringify(rated)
                      );
                      rateCourse(
                        value,
                        courseCompare["course_code"],
                        "difficulty"
                      );
                    }
                  }
                }}
                height={75}
                label={
                  ratingState[courseCompare.course_code]["difficulty"][
                    "amount"
                  ] + " student ratings"
                }
              />
              <h2 style={{ margin: 0 }}>Lectures</h2>
              <StarRatings
                rating={
                  ratingState[courseCompare.course_code]["lecture"]["rating"]
                }
                width={200}
                onClick={(value) => {
                  if (
                    localStorage.getItem(`${courseCompare?.course_code}`) ==
                    null
                  ) {
                    localStorage.setItem(
                      `${courseCompare?.course_code}`,
                      JSON.stringify([false, true, false, false])
                    );
                    rateCourse(value, courseCompare["course_code"], "lecture");
                  } else {
                    const rated = JSON.parse(
                      localStorage.getItem(`${courseCompare?.course_code}`)
                    );
                    if (!rated[1]) {
                      rated[1] = true;
                      localStorage.setItem(
                        `${courseCompare?.course_code}`,
                        JSON.stringify(rated)
                      );
                      rateCourse(
                        value,
                        courseCompare["course_code"],
                        "lecture"
                      );
                    }
                  }
                }}
                height={75}
                label={
                  ratingState[courseCompare.course_code]["lecture"]["amount"] +
                  " student ratings"
                }
              />
              <h2 style={{ margin: 0 }}>Workload</h2>
              <StarRatings
                rating={
                  ratingState[courseCompare.course_code]["workload"]["rating"]
                }
                width={200}
                onClick={(value) => {
                  if (
                    localStorage.getItem(`${courseCompare?.course_code}`) ==
                    null
                  ) {
                    localStorage.setItem(
                      `${courseCompare?.course_code}`,
                      JSON.stringify([false, false, true, false])
                    );
                    rateCourse(value, courseCompare["course_code"], "workload");
                  } else {
                    const rated = JSON.parse(
                      localStorage.getItem(`${courseCompare?.course_code}`)
                    );
                    if (!rated[2]) {
                      rated[2] = true;
                      localStorage.setItem(
                        `${courseCompare?.course_code}`,
                        JSON.stringify(rated)
                      );
                      rateCourse(
                        value,
                        courseCompare["course_code"],
                        "workload"
                      );
                    }
                  }
                }}
                height={75}
                label={
                  ratingState[courseCompare.course_code]["workload"]["amount"] +
                  " student ratings"
                }
              />
              <h2 style={{ margin: 0 }}>Tutorials</h2>
              <StarRatings
                rating={
                  ratingState[courseCompare.course_code]["tutorial"]["rating"]
                }
                width={200}
                onClick={(value) => {
                  if (
                    localStorage.getItem(`${courseCompare?.course_code}`) ==
                    null
                  ) {
                    localStorage.setItem(
                      `${courseCompare?.course_code}`,
                      JSON.stringify([false, false, false, true])
                    );
                    rateCourse(value, courseCompare["course_code"], "tutorial");
                  } else {
                    const rated = JSON.parse(
                      localStorage.getItem(`${courseCompare?.course_code}`)
                    );
                    if (!rated[3]) {
                      rated[3] = true;
                      localStorage.setItem(
                        `${courseCompare?.course_code}`,
                        JSON.stringify(rated)
                      );
                      rateCourse(
                        value,
                        courseCompare["course_code"],
                        "tutorial"
                      );
                    }
                  }
                }}
                height={65}
                label={
                  ratingState[courseCompare.course_code]["tutorial"]["amount"] +
                  " student ratings"
                }
              />
            </div>
            <div style={{ width: "15px" }} />
            <div className="comment-section-container">
              <h1>Comments</h1>
              <div className="comment-form-container">
                <Searchbar
                  placeholder={"Name"}
                  style={{ borderRadius: "5px" }}
                  onChange={(text) => {
                    setCommentName(text);
                  }}
                />
                <div style={{ height: "5px" }} />
                {!submitComment ? (
                  <Searchbar
                    placeholder={"Comment"}
                    style={{ borderRadius: "5px" }}
                    onChange={(text) => {
                      setCommentComment(text);
                    }}
                    onEnterKey={async (text) => {
                      setCommentComment(text);
                      setSubmitComment(true);
                      await setTimeout(() => {
                        leaveComment(courseCompare?.course_code);
                      }, 100);
                    }}
                  />
                ) : (
                  <Loading />
                )}
                <div style={{ height: "14px" }} />
                <Button
                  label={"Comment"}
                  isSecondary
                  onClick={async () => {
                    if (commentComment !== "" && commentComment) {
                      setSubmitComment(true);
                      await setTimeout(() => {
                        leaveComment(courseCompare?.course_code);
                      }, 100);
                    }
                  }}
                />
              </div>
              <div style={{ height: "25px" }} />
              {courseCompare?.comments?.map((comment) => {
                const date = new Date(comment?.time);
                const dateString = date.toISOString()?.substring(0, 10);
                return (
                  <div className="comment-container">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 style={{ marginRight: "8px" }}>
                        {comment?.name == "" ? "Anon." : comment?.name}
                      </h4>
                      <h5>{dateString}</h5>
                    </div>
                    {comment?.comment}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ height: "200px" }} />
        </div>
        <div style={{ display: section[2] ? "block" : "none" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ marginBottom: 0 }}>{courseCompare.course_code}</h1>{" "}
            <div style={{ width: "10px" }} />{" "}
            <FavoriteButton courseCode={courseCompare.course_code} />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginLeft: "-10px",
              marginTop: "10px",
            }}
          >
            {courseCompare?.meeting_sections !== "" ? (
              courseCompare?.meeting_sections.map((section) => {
                return <TimetableSectionContainer section={section} />;
              })
            ) : (
              <></>
            )}
          </div>
          <div style={{ height: "200px" }} />
        </div>
        <div style={{ display: section[3] ? "block" : "none" }}>
          <div
            style={{
              height: "60vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "14px",
              }}
            >
              <h1>{courseCompare.course_code}</h1>
              <div style={{ height: "10px" }}></div>
              <a
                href={`https://courses.skule.ca/course/${courseCompare.course_code}`}
              >
                <Button
                  label="Skule"
                  isSecondary={true}
                  style={{ fontSize: "20px", width: "70%", margin: "auto" }}
                />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ position: "fixed", top: "175px", left: "45px" }}>
        <Button
          isSecondary={compare}
          style={{ width: "10px" }}
          icon={!compare ? Compare : CompareEnabled}
          onClick={() => {
            setCompare(!compare);
            setToggleCollapse(!toggleCollapse);
            setCourseCompareState(emptyCourse);
            setClearSearch(true);
          }}
        />
        <p
          style={{
            width: "70px",
            textAlign: "center",
            fontSize: "13px",
            marginTop: "5px",
          }}
        >
          Compare Courses
        </p>
      </div>

      <div className="courseInfo-page">
        <div className="courseInfo-sidebar">
          <CourseInfoSideBar
            section={section}
            onClick={onTabClick}
            toggleCollapse={toggleCollapse}
          />
        </div>
        {!compare ? (
          courseState?.course_code === "" ? (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Loading />
              <p style={{ marginTop: "15px" }}>Loading</p>
            </div>
          ) : (
            <div className="courseInfo-main" style={{ width: "100%" }}>
              {courseInfo(courseState)}
            </div>
          )
        ) : (
          <>
            <div
              className="courseInfo-main"
              style={{ width: "50%", paddingBottom: "100px" }}
            >
              {courseInfo(courseState)}
            </div>
            <div
              className="courseInfo-main"
              style={{
                width: "50%",
                position: "relative",
                paddingBottom: "100px",
              }}
            >
              <div
                style={{
                  position: "fixed",
                  top: "95px",
                  right: "100px",
                  width: "30%",
                }}
              >
                <div style={{ height: "10px" }} />
                <Searchbar
                  onEnterKey={(text) => {
                    setCourseCompare(text);
                  }}
                  onChange={(text) => {
                    if (text === "") {
                      setCourseCompareState(emptyCourse);
                      setClearSearch(true);
                    } else {
                      setClearSearch(false);
                    }
                  }}
                  placeholder={"Search for a course to compare..."}
                  style={{ marginRight: "33px" }}
                />
              </div>
              {searchCompare && !clearSearch ? (
                <SearchResults
                  searchTerm={searchCompare}
                  setCourse={(data) => {
                    setCourse(data);
                  }}
                />
              ) : (
                <></>
              )}
              {courseCompareState.course_code === "" || clearSearch ? (
                <h3
                  style={{
                    margin: "50px",
                    marginTop: "50px",
                    marginBottom: "-60px",
                    textAlign: "center",
                  }}
                >
                  Please search for a course or choose a favorite course.
                </h3>
              ) : (
                <></>
              )}
              {courseCompareState.course_code === "" || clearSearch ? (
                <div style={{ paddingBottom: "0px" }}>
                  <Favorites
                    setCourseCode={(code) => {
                      setCourseCompare(code);
                      setClearSearch(false);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
              {courseCompareState.course_code !== "" && !clearSearch ? (
                courseInfo(courseCompareState)
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
