import React, { Component } from "react";
import Ball from './ball.jsx';
import './Lottery.css';

class Lottery extends Component {
  static defaultProps = {
    title: "Lotto",
    maxBalls: 6,
    maxNum: 40
  };
  constructor(props) {
    super(props);
    //this will make an array of length of
    //whatever the maxballs is
    this.state = { nums: Array.from({ length: this.props.maxBalls }) };
    this.handleclick = this.handleclick.bind(this);
  }

  generate() {
    //pick a random number between 1 and maxnums

    /*
    * here what we are doing is that
    * we are taking the a brand new array 
    * based on current state nums array, because
    * remember in this call back function, the argument is 
    * current state
    * So we are taking the nums array, and in the constructor 
    * we already already created nums array with 
    * max nums of empty slots. so it is going over those 
    * empty slots and then putting a random value there
    * and then finally setting the new array to the nums array
    */
    this.setState(curState => ({
      nums: curState.nums.map(
        n => Math.floor(Math.random() * this.props.maxNum) + 1)
    }))
   
  }
  handleclick() {
    this.generate();
  }

  render() {
    return (
      <section className="Lottery">
        <h1>{this.props.title}</h1>
        <div>
            {this.state.nums
              .map(n=> <Ball num={n}/>)};
        </div>
        <button 
        className="btn btn-primary" 
        onClick={this.handleclick}>
          Generate
        </button>
      </section>
    );
  }
}

export default Lottery;