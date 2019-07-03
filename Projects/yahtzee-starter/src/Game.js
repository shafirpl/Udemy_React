import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //creating a dice array that has NUM_DICE length
      // usually Array.from is used to copy an array
      // but this is a nice shortcut to create an
      // array of length something in javasript
      dice: Array.from({
        length: NUM_DICE
      }),
      // Search array.fill method, but what it does
      // is that it is creating an array of NUM_DICE elements
      // and then filling all the values with false

      // the way it works, when we click on one of the dice
      // the corresponding index will flip the value to true
      // in order to track which element was paused/locked
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
  }

  /*
  * This is a life cycle method
  * it will call the animateRoll funciton
  * As soon as the Game component, or this
  * component gets rendered
  */
  componentDidMount(){
    this.animateRoll();
  };
  /*
  * this function will first do the rolling animation
  * for the dices, and then call the roll function to 
  * generate the random numbers
  * The reason we have 1s, because we defined our 
  * animation to be 1 second in Die.css, so call the roll function 
  * after the animation finishes
  */
  animateRoll(){
    this.setState({ rolling: true}, () => {
      setTimeout(this.roll, 1000);
    })
  }
  /*
  * This is the magic function that rolls 
  * the dice 
  * https://www.w3schools.com/jsref/jsref_map.asp
  * Good explanation of how it works for multi parameters
  */
  roll(evt) {
    // roll dice whose indexes are in reroll

    /*
    * So whats is doing is that, lets say we locked
    * or paused dice at index 2 which had value say 5
    * We want to keep the value 5 for that locked dice
    * but for other dice, we want to generate random numbers
    * That is what it is doing, if the index is locked, keep
    * the value as it is, but then if it is not locked, 
    * generate a random number
    */
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      /*
      * This part is checking how many rolls left, if 
      * there is more than 1 roll left, then 
      * we don't need any change
      * Otherwise, fill every element in locked
      * array with true value
      */
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false
    }));
  }

  /* 
  * we will pass down this function into two components,
  * first we will pass it to the Dice component, and from there
  * we will pass it to the Die component, from which the 
  * function will be actually triggered
  */
  toggleLocked(idx) {
    // toggle whether idx is in locked or not

    /* 
      * so what it is doing here is that
      * it is slicing the array or splitting up
      * the old locked array at idx positon.
      * lets say the idx is 2, so it will break
      * the locked array at 2nd positon (remember 1st
      * position is index 0, and slice method exclude the 
      * end position)
      * This is how array.slice works
      * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      * so it will return the locked array sliced at 1, then
      * we would flip the boolean value at the index element,
      * and then we would slice again from 3 to end of array

      * so basically, we are building a new locked array, 
      * splitting up from 0 to idx-1 position array from the old state locked
      * array, 
      * flipping the value at idx position and adding that 
      * element, and then finally adding the rest of the array
      * 
      */

      if (this.state.rollsLeft > 0 && !this.state.rolling) {
        this.setState(st => ({
          locked: [
            ...st.locked.slice(0, idx),
            !st.locked[idx],
            ...st.locked.slice(idx + 1)
          ]
        }));
      }
  }

  /*
   * rulefn is a function itself
   * we are passing the function to the ScoreTable component, from which we will pass it
   * Look first at the Rules.js file to understand how the evalRol function works
   * in the defined classes, then look at ScoreTable.js file to understand
   * what function and value are being passed into it
   * Then watch from 12:20
   * https://www.udemy.com/modern-react-bootcamp/learn/lecture/14375922#questions
   * 
   */

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn function with the dice and score this rulename
    this.setState(st => ({
      scores: {
        ...st.scores,
        [rulename]: ruleFn(this.state.dice)
      },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.animateRoll();
  }

  displayRollInfo(){
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round"
    ]
    return messages[this.state.rollsLeft];
  }
  render() {
    /*
    * this is equivalent to
    * this.dice = this.state.dice;
    * this.locked = this.state.locked;
    * this.rollsLeft = this.state.rollsLeft
    * and so on
    */
   const {dice, locked, rollsLeft, rolling, scores} = this.state;
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title"> Yahtzee! </h1>
          <section className="Game-dice-section">
            <Dice
              dice={dice}
              locked={locked}
              disabled = {rollsLeft === 0}
              handleClick={this.toggleLocked}
              rolling = {rolling}
            />{" "}
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                /* 
                * What this is doing is that,
                * locked array lookes like this
                * [true,false,true,false,true] or 
                * something like this. 
                * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
                * Now every will return true if every element is true in the locked array, so the button
                * will get disabled if every element in locked array is true
                * this.state.rolling option makes sure that when the dices
                * are rolling, the roll button stays disabled.
                */
                disabled={locked.every(x => x) || rollsLeft === 0 || rolling}
                onClick={this.animateRoll}
              >
                {/* {this.state.rollsLeft}
                Rerolls Left{" "} */}
                {this.displayRollInfo()}
              </button>{" "}
            </div>{" "}
          </section>{" "}
        </header>{" "}
        <ScoreTable doScore={this.doScore} scores={scores} />{" "}
      </div>
    );
  }
}

export default Game;
