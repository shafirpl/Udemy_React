import React, { Component } from 'react';
import "./Card.css";
// here we have to do src = {this.props.image} instead of src = "{this.props.image}",
// because for some weird reason the "" wouldn't fetch the proper image for some reason
class Card extends Component{
    constructor(props){
        super(props);
        /*
        * The reason we put it here because: https://www.udemy.com/modern-react-bootcamp/learn/lecture/14376028#questions
        * Watch from 5:02 to understand the problem. 
        * Basically, we only want to generate the random numbers once. Also remember,
        * every card we see is basically object of class Card. So when we create a single card, 
        * we run this functions of this class. What was happenign was that, every single card was
        * being re-rendered, so those random number functions were running every time we click the
        * button. So if we put everything inside constructor, which will only run once and won't run
        * again when the component gets rerendered,we put everything inside the constructor so that
        * when every cards get rendered for the first time, they run the random number generator
        * funciton only once, and on subsequent re-render, they won't run the random number generator 
        * functions as they are put inside constructor, so they get to keep their position.
        */

        /* this is just some random stuff that colt came up with, there is actually no logic
        * why we have to get the random number between 0-89 and substract 45, it just looks cool
        * I guess
        */
        let angle = Math.random() * 90 - 45;
        let xPos = Math.random() * 40 - 20;
        let yPos = Math.random() * 40 - 20;
        //it should look like this
        // transform: translate(10px, 20px) rotate(20deg);
        this.transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    }
 render(){


     return(
         <img style = {{transform: this.transform}} className="Card" src={this.props.image} alt="{this.props.name}"/>
     )
 }
}

export default Card;