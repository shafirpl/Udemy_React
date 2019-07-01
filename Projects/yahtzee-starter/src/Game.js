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
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1
    }));
  }

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

    this.setState(st => ({
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ]
    }));
  }

  /*
   * rulefn is a function itself
   * we are passing the function to the ScoreTable component, from which we will pass it
   */
  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: {
        ...st.scores,
        [rulename]: ruleFn(this.state.dice)
      },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
  }

  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title"> Yahtzee! </h1>
          <section className="Game-dice-section">
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
            />{" "}
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={this.state.locked.every(x => x)}
                onClick={this.roll}
              >
                {this.state.rollsLeft}
                Rerolls Left{" "}
              </button>{" "}
            </div>{" "}
          </section>{" "}
        </header>{" "}
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />{" "}
      </div>
    );
  }
}

export default Game;
