import React, { Component } from "react";
import "./css/minorcard.css";

class MinorListCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={"minor-card"}>{this.props.minor_name}</div>;
  }
}

export default MinorListCard;
