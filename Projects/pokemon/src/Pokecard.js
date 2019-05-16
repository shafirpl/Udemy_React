import React, { Component } from "react";
import "./Pokecard.css";
// const POKE_API =
//   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const POKE_API = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

/*
 * this functions takes something, say 7, and make it 007, or lets say 12, and
 * make it 012 and stuff like that
 * The explanation of this method
 * https://www.udemy.com/modern-react-bootcamp/learn/lecture/14375516#questions
 */

let padToThree = number => (number <= 999 ? `00${number}`.slice(-3) : number);

class Pokecard extends Component {
  render() {
    // This will add the url together, so the url will
    // look like this
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png
    let imgSrc = `${POKE_API}${padToThree(this.props.id)}.png`;
    return (
      <div className="Pokecard">
        <h1 className="Pokecard-title">{this.props.name}</h1>
        <img src={imgSrc} alt={this.props.name} />
        <div className="Pokecard-data">Type: {this.props.type} </div>
        <div className="Pokecard-data">EXP: {this.props.exp} </div>
      </div>
    );
  }
}

export default Pokecard;
