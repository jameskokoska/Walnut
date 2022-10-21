import React from "react";
import "./Navbar.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="link">
        <div className="navbar-left-container">
          <img src={logo} alt="" className="navbar-img" />
          Walnut
        </div>
      </Link>
      <div className="navbar-right-container">
        <Searchbar placeholder={"Search..."} />
        <div style={{ width: "10px" }} />
        <Link to="/about">
          <Button label={"About"} />
        </Link>
      </div>
    </div>
  );
}
