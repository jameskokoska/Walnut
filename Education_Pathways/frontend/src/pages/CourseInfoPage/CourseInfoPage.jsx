import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CourseInfoSideBar from "../../components/CourseInfoSideBar/CourseInfoSideBar";
import API from "../../api";
import "./CourseInfoPage.scss";
import "./comparison.scss";
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
  const rateCourse = (value, courseCode, type) => {
    // Submit the rating to backend here
    API.post("/course/addrating",  { courseCode, value, type }).then(res => {
      console.log(res);
    })
    console.log(value, courseCode, type);
  };

  const [commentName, setCommentName] = useState(false);
  const [commentComment, setCommentComment] = useState(false);
  const leaveComment = async (courseCode) => {
    const commentDate = new Date().toISOString();
    const commentObj = {
      name: commentName,
      comment: commentComment,
      time: commentDate,
    };

    // Submit the comment to backend here
    API.post(`/course/addreview?code=${courseCode}`, commentObj).then((res) => {});
    console.log(commentName, commentComment, commentDate);

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

  const { code } = useParams();
  const [section, setSection] = useState([true, false, false, false]);
  const [compare, setCompare] = useState(false);
  const [searchCompare, setSearchCompare] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [courseState, setCourseState] = useState(emptyCourse);
  const [courseCompareState, setCourseCompareState] = useState(emptyCourse);
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [submitComment, setSubmitComment] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();

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
        ratings: 
        coursePassed.ratings,
        // {
        //   difficulty: { rating: 4.57, amount: 5 },
        //   lecture: { rating: 5, amount: 15 },
        //   workload: { rating: 4, amount: 3 },
        //   tutorials: { rating: 4.2, amount: 1 },
        // },
        comments: coursePassed.comments,
        // [
        //   {
        //     name: "Bob",
        //     comment: "Hello my name is bob, I like this course!",
        //     time: "2012-10-05T14:48:00.000Z",
        //   },
        //   {
        //     name: "Bill",
        //     comment: "Hello my name is bill, I like this course more!",
        //     time: "2011-10-05T14:48:00.000Z",
        //   },
        // ],
      });
      // we need to get the comments and ratings here if the course was passed
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
          ratings: data.ratings
          // {
          //   difficulty: { rating: 4.57, amount: 5 },
          //   lecture: { rating: 5, amount: 15 },
          //   workload: { rating: 4, amount: 3 },
          //   tutorials: { rating: 4.2, amount: 1 },
          // }
          ,
          comments: data.comments,
          // [
          //   {
          //     name: "Bob",
          //     comment: "Hello my name is bob, I like this course!",
          //     time: "2012-10-05T14:48:00.000Z",
          //   },
          //   {
          //     name: "Bill",
          //     comment: "Hello my name is bill, I like this course more!",
          //     time: "2011-10-05T14:48:00.000Z",
          //   },
          // ],
        });
      })
      .catch(() => {
        navigate("course-not-found");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCourseCompare = (compareCode) => {
    setSearchCompare(false);
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
          // we need to get the comments and ratings here
          ratings: data.ratings
          // {
          //   difficulty: { rating: 4.57, amount: 5 },
          //   lecture: { rating: 5, amount: 15 },
          //   workload: { rating: 4, amount: 3 },
          //   tutorials: { rating: 4.2, amount: 1 },
          // }
          ,
          comments: data.comments,
          // [
          //   {
          //     name: "Bob",
          //     comment: "Hello my name is bob, I like this course!",
          //     time: "2012-10-05T14:48:00.000Z",
          //   },
          //   {
          //     name: "Bill",
          //     comment: "Hello my name is bill, I like this course more!",
          //     time: "2011-10-05T14:48:00.000Z",
          //   },
          // ],
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
      // we need to get the comments and ratings here
      ratings: data.ratings,
      // {
      //   difficulty: { rating: 4.57, amount: 5 },
      //   lecture: { rating: 5, amount: 15 },
      //   workload: { rating: 4, amount: 3 },
      //   tutorials: { rating: 4.2, amount: 1 },
      // },
      // fetch data from backend
      comments: data.comments,
      // [
      //   {
      //     name: "Bob",
      //     comment: "Hello my name is bob, I like this course!",
      //     time: "2012-10-05T14:48:00.000Z",
      //   },
      //   {
      //     name: "Bill",
      //     comment: "Hello my name is bill, I like this course more!",
      //     time: "2011-10-05T14:48:00.000Z",
      //   },
      // ],
    });
  };

  const courseInfo = (courseCompare) => {
    return (
      <>
        <div style={{ display: section[0] ? "block" : "none" }}>
          <div style={{ height: "120px" }} />
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

          <p>{courseCompare.course_description}</p>
          <CourseConnections course={courseCompare} />
        </div>
        <div style={{ display: section[1] ? "block" : "none" }}>
          <div style={{ height: "120px" }} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ marginBottom: 0 }}>{courseCompare.course_code}</h1>{" "}
            <div style={{ width: "10px" }} />{" "}
            <FavoriteButton courseCode={courseCompare.course_code} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="review-and-ratings-container">
              <p>Click a rating to rate this course!</p>
              <h2 style={{ margin: 0 }}>Difficulty</h2>
              <StarRatings
                rating={courseCompare?.ratings["difficulty"]["rating"]}
                width={200}
                onClick={(value) => {
                  rateCourse(value, courseCompare["course_code"], "difficulty");
                }}
                height={75}
                label={
                  courseCompare?.ratings["difficulty"]["amount"] +
                  " student ratings"
                }
              />
              <h2 style={{ margin: 0 }}>Lectures</h2>
              <StarRatings
                rating={courseCompare?.ratings["lecture"]["rating"]}
                width={200}
                onClick={(value) => {
                  rateCourse(value, courseCompare["course_code"], "lecture");
                }}
                height={75}
                label={
                  courseCompare?.ratings["lecture"]["amount"] +
                  " student ratings"
                }
              />
              <h2 style={{ margin: 0 }}>Workload</h2>
              <StarRatings
                rating={courseCompare?.ratings["workload"]["rating"]}
                width={200}
                onClick={(value) => {
                  rateCourse(value, courseCompare["course_code"], "workload");
                }}
                height={75}
                label={
                  courseCompare?.ratings["workload"]["amount"] +
                  " student ratings"
                }
              />
              <h2 style={{ margin: 0 }}>Tutorials</h2>
              <StarRatings
                rating={courseCompare?.ratings["tutorials"]["rating"]}
                width={200}
                onClick={(value) => {
                  rateCourse(value, courseCompare["course_code"], "tutorials");
                }}
                height={65}
                label={
                  courseCompare?.ratings["tutorials"]["amount"] +
                  " student ratings"
                }
              />
            </div>
            <div style={{ width: "15px" }} />
            <div className="review-and-ratings-container">
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
              {courseCompare?.comments.map((comment) => {
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
                      <h4 style={{ margin: 0 }}>{comment?.name}</h4>
                      <h5>{dateString}</h5>
                    </div>
                    {comment?.comment}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ height: "120px" }} />
        </div>
        <div style={{ display: section[2] ? "block" : "none" }}>
          <div style={{ height: "120px" }} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ marginBottom: 0 }}>{courseCompare.course_code}</h1>{" "}
            <div style={{ width: "10px" }} />{" "}
            <FavoriteButton courseCode={courseCompare.course_code} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courseCompare?.meeting_sections !== "" ? (
              courseCompare?.meeting_sections.map((section) => {
                return <TimetableSectionContainer section={section} />;
              })
            ) : (
              <></>
            )}
          </div>
          <div style={{ height: "120px" }} />
        </div>
        <div style={{ display: section[3] ? "block" : "none" }}>
          <iframe
            src={`https://courses.skule.ca/course/${courseCompare.course_code}`}
            style={{ width: "80vw", height: "90vh" }}
          ></iframe>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ position: "fixed", top: "100px", left: "20px" }}>
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
            <div className="courseInfo-main" style={{ width: "50%" }}>
              {courseInfo(courseState)}
            </div>
            <div
              className="courseInfo-main"
              style={{
                width: "50%",
                paddingLeft: "15px",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", width: "100%" }}>
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
                    marginTop: "200px",
                    textAlign: "center",
                  }}
                >
                  Please search for a course or choose a favorite course.
                </h3>
              ) : (
                <></>
              )}
              {courseCompareState.course_code === "" || clearSearch ? (
                <div style={{ testAlign: "center" }}>
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
