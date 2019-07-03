import React, { Component } from 'react';
import Die from './Die';
import './Dice.css';

class Dice extends Component {
  render() {
    return <div className="Dice">
      {this.props.dice.map((d, idx) =>
      /*
      * this is the toggleLocked function, which was passed to
      * this component as locked property from Game.js
      * here we are passing it again to the Die component
      */
        <Die handleClick={this.props.handleClick}
          val={d}
          //only the rolls that are not disabled should be allowed to roll
          rolling = {this.props.rolling && !this.props.locked[idx]}
          disabled = {this.props.disabled}
          locked={this.props.locked[idx]}
          idx={idx}
          key={idx} />
      )}
    </div>
  }
}

export default Dice;