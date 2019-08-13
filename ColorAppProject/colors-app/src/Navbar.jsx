import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';



export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(evt) {
    /*
    * the props.handleFormatChange corresponds to the changeFormat function
    * in Paletter.jsx file. Passing a value to that function will change
    * the format of color in Paletter.jsx state when the function is triggered.
    */
    this.setState({ format: evt.target.value });
    this.props.handleFormatChange(evt.target.value);
    // this will set the open state to true
    // so that the snackbar opens up
    this.setState({ open: true });
    ;
  }

  closeSnackbar() {
    this.setState({ open: false });
  }
  render() {
    const { level, changeLevel, showingAllColors } = this.props;
    const { format } = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link exact to="/">reactcolorpicker</Link>
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

        {
          showingAllColors &&
          (<div className="slider-container">
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
          </div>)
        }

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
            onChange={this.handleFormatChange}>
            <MenuItem value="hex"> HEX - #fff</MenuItem>
            <MenuItem value="rgb"> RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba"> RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        {/* 
        * Snackbar documentation: https://material-ui.com/api/snackbar/
        * AnchorOrigin tells us where the snackbar will be
        * located. for example, bottom left means the pop up
        * will be in the bottom left of our screen
        * open defines whether the snackbar is opened or closed
        * autohide takes an argument in miliseconds and tells us
        * that after that many miliseconds it will hide itself
        * message is the thing that will display when this 
        * snackbar is open
        * content porps is just a accessiblity thing, nothing important
        * 
        * Now in materials ui any icon needs to be under icon button,
        * just like bootstrap where columns need to be under rows
        * onClose will trigger the close function when we click
        * anywhere on the screen
        */}
        <Snackbar
          onClose={this.closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="message-id">Format Changed to {format.toUpperCase()}</span>
          }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          action={[
            <IconButton
              aria-label="close"
              key="close"
              onClick={this.closeSnackbar}
              color="inherit">
              <CloseIcon />
            </IconButton>
          ]}
        >

        </Snackbar>
      </header>
    );
  }
}
