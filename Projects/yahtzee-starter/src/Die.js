import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    //this.props.handleclick refers to the 
    // toggleClick function passed from Game.js to Dice
    // and from Dice to here as a props named handleClick
    this.props.handleClick(this.props.idx);
  }
  render() {
    return (
      <button
        className={"Die"}
        style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
        // This handleClick function is passed from Dice, which was
        // then passed from Game.js, and it will trigger the toggleLocked
        // function defined in Game.js

        // The problem here is, the function is expecting an index
        // value, so if we don't pass in the index value, which we
        // are not doing here, it will result in unexpected behaviour,
        // like this
        // https://www.udemy.com/modern-react-bootcamp/learn/lecture/14375920#questions
        // watch from 4:00 to 6:05
        // 5:45-> we are using that event as the index is pretty 
        // important

        // onClick={this.props.handleClick}
        // Remember, we are sending the index number from the Dice 
        // Component to this component as props.
        onClick = {this.handleClick }
      >
        {this.props.val}
      </button>
    );
  }
}

export default Die;
