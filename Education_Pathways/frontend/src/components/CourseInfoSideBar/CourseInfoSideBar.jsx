import React from "react";
import { useState } from "react";
import CourseInfoTab from "../CourseInfoTab/CourseInfoTab";
import "./CourseInfoSidebar.css";

import Info from "../icons/Info";
import Review from "../icons/Review";
import Prof from "../icons/Prof";
import Exam from "../icons/Exam";
import Arrow from "../icons/Arrow";

export default function CourseInfoSidebar({ section, onClick }) {
  return (
    <div>
      <CourseInfoTab
        id={0}
        icon={<Info active={section[0]} />}
        text="Course Information"
        active={section[0]}
        secondary={false}
        onClick={onClick}
      />
      <CourseInfoTab
        id={1}
        icon={<Review active={section[1]} />}
        text="Reviews and Ratings"
        active={section[1]}
        secondary={false}
        onClick={onClick}
      />
      <CourseInfoTab
        id={2}
        icon={<Prof active={section[2]} />}
        text="Professor's Information"
        active={section[2]}
        secondary={false}
        onClick={onClick}
      />
      <CourseInfoTab
        id={3}
        icon={<Exam active={section[3]} />}
        text="Past Exams"
        active={section[3]}
        secondary={false}
        onClick={onClick}
      />
      <CourseInfoTab icon={<Arrow />} secondary={true} />
    </div>
  );
}
