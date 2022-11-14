import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";

import logo from "../img/logo.png";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
import Info from "../../components/img/info.svg";
import Favorites from "../../components/img/heart-fill-blue.svg";

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
          onEnterKey={(value) => navigate(`/search?term=${value}`)}
        />
        <div style={{ width: "10px" }} />
        <Link to="/about" className="link">
          <Button icon={Info} />
        </Link>
        <div style={{ width: "10px" }} />
        <Link to="/favorites" className="link">
          <Button icon={Favorites} />
        </Link>
      </div>
    </div>
  );
}
