import React, { Component } from "react";
import "./css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./img/logo.png";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// import LogIn from "./LogIn.jsx";
// import CourseDescriptionPage from "./CourseDescription";
// import Wishlist from './Wishlist';
// import SignUp from './SignUp'
// import SearchResultDisplay from './ResultDisplay'

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      login: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("username") !== "") {
      this.setState({ username: localStorage.getItem("username") });
    }
  }

  logOut = () => {
    localStorage.setItem("username", "");
    this.setState({ username: "" });
  };

  render() {
    return (
      <div>
        <Navbar bg="myBlue" variant="dark" sticky="top" expand="lg">
          <Navbar.Brand>
            <img src={logo} alt="" />{" "}
            <Link to="/">
              <Nav style={{ color: "white", display: "inline" }}>
                Education Pathways
              </Nav>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>

              {/* <Nav.Link href="/search" style={{ color: "white", display: "inline" }}>
                  Search
                </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
