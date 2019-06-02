import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  render() {
    //we could do this like this as well
    // let cls = `fas fa-dice-${this.props.face}`;
    //<i className={cls}></i>
    return (
    <i className={`Die fas fa-dice-${this.props.face}`} />
    );
  }
}

export default Die;
