import React, { Component } from "react";
import "./Hangman.css";
import {randomWord} from './words';
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  /*
  * This function resets the game
  */

  reset(){
    //since we are setting everything new and so they
    //don't depend on old state, so we are not doing any
    //callback

    this.setState({
      nWrong : 0,
      guessed : new Set(),
      answer: randomWord(),

    });
  }

  

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  /*
   * https://www.udemy.com/modern-react-bootcamp/learn/lecture/14375668#questions
   * Watch from 4:07 to 6:21
   * So basically it is taking the string, making it an array
   * or transforming the string to an array
   * so "Apple" will become ["A","p","p","l","e"], and afterwards
   * with .split(""), and then running a loop for each element and
   * checking to see if that word exists in the guessed array
   * that checking is being done by
   */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  /*
   * https://www.udemy.com/modern-react-bootcamp/learn/lecture/14375668#questions
   * Watch from 8:02 to 
   */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  /*
   * Similarly, we have a-z, and then we are transfroming the whole
   * string to an array, and then running a loop and for every
   * element in that array, we are creating a button with the value,
   * adding an event listener and adding disabled property
   */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        // adding key here
        //Key has to be unique, however since 
        //each letter is being used, and not duplicated
        //letters are used, it is better just to use
        //the letter itself
        key = {ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    // so if the statement is true, gameover will be true and
    // vice versa
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const altText = `${this.state.nWrong}/ ${this.props.maxWrong} guesses`;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateButtons();
    if (isWinner){
      gameState = "You Win";
    }
    if(gameOver) gameState = "You Lose"
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt = {altText} />
        <p>Guessed Wrong: {this.state.nWrong}</p>
        <p className="Hangman-word">{!gameOver? 
        this.guessedWord(): this.state.answer}</p>
        <p className="Hangman-btns">
          {gameState}
        </p>
        {/* .join method when passed an empty string will
        make the array a string, because right now our 
        guessedWord is a character array */}

        {/* similarly the second part of the && will always be 
        true for this case, so if and only if the first part 
        is true the p will be displayed 
        This && is equivalent to ngIf */}

        {/* {this.guessedWord().join("") === this.state.answer && <p>You Win</p>} */}
        <button
        id = "reset" 
        onClick={this.reset}>Restart!</button>
      </div>
    );
  }
}

export default Hangman;
