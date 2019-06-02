import React, { Component } from 'react';
import Die from './Die.jsx';


class RollDice extends Component {
    static defaultProps = {
        sides: ["one", "two", "three", "four", "five", "six"]
    }
    constructor(props) {
        super(props);
        this.state = { die1: "one", die2: "one" };
        this.roll = this.roll.bind(this);
    }
    roll() {
        //pick 2 new roles
        const newDie1 = this.props.sides[
            Math.floor(Math.random() * this.props.sides.length)
        ];

        const newDie2 = this.props.sides[
            Math.floor(Math.random() * this.props.sides.length)
        ];
        //set states with new rolls
        this.setState({die1: newDie1, die2:newDie2});
    }
    render() {
        return (
            <div>
                <Die face={this.state.die1} />
                <Die face={this.state.die2} />
                <div><button onClick={this.roll} class="btn btn-primary">Roll Dice !</button></div>  
            </div>
        );

    }
}

export default RollDice;