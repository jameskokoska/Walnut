import React from "react";
import CourseInfoTab from "../CourseInfoTab/CourseInfoTab";
import "./CourseInfoSidebar.css";

import Info from "../icons/Info";
import Review from "../icons/Review";
import Prof from "../icons/Prof";
import Exam from "../icons/Exam";

export default function CourseInfoSidebar() {
  return (
    <>
      <CourseInfoTab
        icon={<Info active={false} />}
        text="Course Information"
        secondary={false}
      />
      <CourseInfoTab
        icon={<Review active={false} />}
        text="Reviews and Ratings"
        secondary={false}
      />
      <CourseInfoTab
        icon={<Prof active={false} />}
        text="Professor's Information"
        secondary={false}
      />
      <CourseInfoTab
        icon={<Exam active={false} />}
        text="Past Exams"
        secondary={false}
      />
    </>
  );
}
