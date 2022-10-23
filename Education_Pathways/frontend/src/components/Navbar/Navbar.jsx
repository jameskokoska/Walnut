import React from "react";
import "./Navbar.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Link to="/" className="link">
        <div className="navbar-left-container">
          <img src={logo} alt="" className="navbar-img" />
          Walnut
        </div>
      </Link>
      <div className="navbar-right-container">
        <Searchbar
          placeholder={"Search..."}
          onEnterKey={(value) => navigate(`/courseinfo/${value}`)}
        />
        <div style={{ width: "10px" }} />
        <Link to="/about" className="link">
          <div className="about-btn-outer">
            <div className="about-btn-inner">i</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
