import React from "react";
import { useParams } from "react-router-dom";
import "./CourseInfoPage.css";

export default function CourseInfoPage() {
  const { code } = useParams();

  return (
    <div className="courseInfo-page">
      <h1>Course Information for {code}</h1>
    </div>
  );
}
