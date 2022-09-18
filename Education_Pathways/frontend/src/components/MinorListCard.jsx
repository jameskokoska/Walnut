import React, { Component } from "react";
import "./css/minorcard.css";
import "bootstrap/dist/css/bootstrap.css";

class MinorListCard extends Component{

    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div className={"minor-card"}>
                {this.props.minor_name}
            </div>
        )
    }
}


export default MinorListCard;
