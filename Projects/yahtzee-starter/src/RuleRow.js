import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  render() {
    /*
    * This is equivalent to writing these 4 lines
    * const score = this.props.score;
    * const name = this.props.name;
    * const doScore = this.props.doScore;
    * const description = this.props.description;
    */
    const {score, name, doScore, description} = this.props;
    const disabled = score === undefined;
    return (
      /* 
      * we should only allow the user to use the score once, if the score is already
      * been used (let's say the player already clicked on ones), s/he shouldn't be able
      * to use that score again. And we only pass the score property if the user has
      * clicked on the score. So at the begining all the scores are undefined, but 
      * as soon as the user clicked on any of them, those clicked scores are no longer undefined.
      * So if the score is already passed/used, disable that score
      * using null would acheive this purpose.
      */ 
      <tr className={`RuleRow RuleRow-${disabled ? 'active': 'disabled'}` } onClick={disabled?  doScore: null }>
        <td className="RuleRow-name">{name}</td>
        <td className="RuleRow-score">{disabled? description :score}</td>
      </tr>
    )
  }
}

export default RuleRow;