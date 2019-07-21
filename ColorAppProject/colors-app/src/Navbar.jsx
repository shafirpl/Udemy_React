import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    const { level, changeLevel } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>

        {/*
         * so it starts from min value at 100, gets either
         * incremented by decremented by step which is 100,
         * and the max value it gets is 900. When the app
         * loads up, it starts with the default value of
         * 500
         *
         * onAfterchange pass in the level value as argument
         * to the function specified there automatically
         */}

        <div className="slider-container">
          <div className="slider">
            <span>Level:{level}</span>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      </header>
    );
  }
}
