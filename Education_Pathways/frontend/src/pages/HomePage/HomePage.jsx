import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Searchbar from "../../components/Searchbar/Searchbar";
import { HomePageStyles } from "../../util/styles";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div style={HomePageStyles.bg}>
      <div className="home-page" style={HomePageStyles.content}>
        <h1>Walnut</h1>
        <h2>University of Toronto’s Course Database and Comparison Tool</h2>
        <div style={{ height: "25px" }} />
        <SearchbarHome />
        <div style={{ height: "15px" }} />
        <Button label={"Search"} isSecondary style={HomePageStyles.btn} />
      </div>
    </div>
  );
}

const SearchbarHome = () => {
  const placeholders = ["course code", "course name", "description", "keyword"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderSwitch, setPlaceholderSwitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderSwitch(true);
      setTimeout(() => {
        setPlaceholderSwitch(false);
        setPlaceholderIndex(
          (prevPlaceholderIndex) => (prevPlaceholderIndex + 1) % 4
        );
      }, 350);
    }, 3100);
    return () => clearInterval(interval);
  }, []);
  return (
    <Searchbar
      style={{ width: "80%", maxWidth: "650px" }}
      placeholder={"Search by " + placeholders[placeholderIndex] + "..."}
      className={
        placeholderSwitch ? "text-input-search-placeholder-transition" : ""
      }
    ></Searchbar>
  );
};
