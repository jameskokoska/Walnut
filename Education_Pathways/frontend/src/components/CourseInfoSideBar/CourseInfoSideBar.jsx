import React from "react";
import { useState } from "react";
import CourseInfoTab from "../CourseInfoTab/CourseInfoTab";
import "./CourseInfoSidebar.scss";

import Info from "../icons/Info";
import Review from "../icons/Review";
import Schedule from "../icons/Schedule";
import Exam from "../icons/Exam";
import Comparison from "../icons/Comparison"
import Arrow from "../icons/Arrow";
import { useEffect } from "react";

export default function CourseInfoSidebar({ section, onClick, toggleCollapse }) {
  const [collapse, setCollapse] = useState(false);

  useEffect(()=>{
    setCollapse(toggleCollapse)
  }, [toggleCollapse])

  return (
    <div>
      <CourseInfoTab
        id={0}
        icon={<Info active={section[0]} />}
        text="Course Information"
        active={section[0]}
        onClick={onClick}
        collapse={collapse}
      />
      <CourseInfoTab
        id={1}
        icon={<Review active={section[1]} />}
        text="Reviews and Ratings"
        active={section[1]}
        onClick={onClick}
        collapse={collapse}
      />
      <CourseInfoTab
        id={2}
        icon={<Schedule active={section[2]} />}
        text="Timetable"
        active={section[2]}
        onClick={onClick}
        collapse={collapse}
      />
      <CourseInfoTab
        id={3}
        icon={<Exam active={section[3]} />}
        text="Past Exams"
        active={section[3]}
        onClick={onClick}
        collapse={collapse}
      />
      <CourseInfoTab
        icon={<Arrow collapse={collapse} />}
        secondary={true}
        onClick={() => setCollapse((prev) => !prev)}
      />
    </div>
  );
}
