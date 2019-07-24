import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';


export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    /*
    * the props.handleChange corresponds to the changeFormat function
    * in Paletter.jsx file. Passing a value to that function will change
    * the format of color in Paletter.jsx state when the function is triggered.
    */
    this.setState({ format: evt.target.value });
    this.props.handleChange(evt.target.value);
    ;
  }
  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;
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
        <div className="select-container">
          {/* 
          * this select component from material ui
          * will help us to choose format. For example:
          * if we chose hex, then clicking any color will copy its hex
          * value, chosing rgb will copy its rgb value and so on.
          * Remember, if we don't pass parameters/arguments to a function that
          * is triggered when something changes (onChange property), it will take the
          * whole event object as the parameter/argument. Then we do evt.target.value 
          * to grab the values.
          */}
          <Select
            value={format}
            onChange={this.handleChange}>
            <MenuItem value="hex"> HEX - #fff</MenuItem>
            <MenuItem value="rgb"> RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba"> RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar anchorOrigin>

        </Snackbar>
      </header>
    );
  }
}
