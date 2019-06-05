import React, { Component } from "react";
import {choice} from './helper.jsx';
import Coin from './Coin.jsx';

class CoinContainer extends Component {
  static defaultProps = {
    coins: [
      { side: "heads", imgSrc: "https://tinyurl.com/react-coin-heads-jpg" },
      { side: "tails", imgSrc: "https://tinyurl.com/react-coin-tails-jpg" }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      currCoin: null,
      nFlips: 0,
      nHeads: 0,
      nTails: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  flipCoin(){
    const newCoin = choice(this.props.coins);
    this.setState(st => {
      return {
        currCoin: newCoin,
        nFlips: st.nFlips + 1,
        nHeads: st.nHeads + (newCoin.side === "heads" ? 1 : 0),
        nTails: st.nTails + (newCoin.side === "tails" ? 1 : 0),
      };
    });
  }
  handleClick(e){
    this.flipCoin();
  }
  render() {
    return (
      <div className="coinContainer">
        <h2>Let's Flip A Coin</h2>
        {/* Here since at the begining the curr coin is null, so we will get 
        an error saying can't read property of null, in order to fix this, we 
        check if the currCoin is null or not */}

        {/* Here we are passing the entire state object to the coin 
        component */}
        {this.state.currCoin && <Coin info={this.state.currCoin} /> }
        <button
          onClick={this.handleClick}
          className="btn btn-primary">
          Flips Me!
        </button>
        <p>
          Out of {this.state.nFlips} flips, there have been {this.state.nHeads}{" "}
          Heads and {this.state.nTails} Tails
        </p>
      </div>
    );
  }
}

export default CoinContainer;