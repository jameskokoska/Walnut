import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const onValueChange = (value) => {
    setValue(value);
  };

  return (
    <div className="home-page">
      <h1>Walnut</h1>
      <h2>
        University of Toronto’s Detailed Course Database and Comparison Tool
      </h2>
      <div style={{ height: "20px" }} />
      <SearchbarHome onChange={onValueChange} />
      <div style={{ height: "10px" }} />
      <Button
        label={"Search"}
        isSecondary
        onClick={() => navigate(`/courseinfo/${value}`)}
      />
    </div>
  );
}

const SearchbarHome = ({ onChange }) => {
  const placeholders = ["course code", "course name", "description", "keyword"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderSwitch, setPlaceholderSwitch] = useState(false);
  const navigate = useNavigate();

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
      onChange={onChange}
      onEnterKey={(value) => navigate(`/courseinfo/${value}`)}
    ></Searchbar>
  );
};
