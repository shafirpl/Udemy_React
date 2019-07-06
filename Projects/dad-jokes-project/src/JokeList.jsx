import React, { Component } from 'react';
import Joke from "./Joke.jsx";
import uuid from 'uuid/v4';
import axios from 'axios';
import './JokeList.css';

const JOKE_URL = "https://icanhazdadjoke.com/";

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10,
    }

    constructor(props) {
        super(props);
        this.state = { jokes: [] };
    }
    async componentDidMount() {
        let jokes = [];
        //getting the jokes
        while (jokes.length < this.props.numJokesToGet) {
            /*
            * The reason we had to pass the headers, is 
            * https://icanhazdadjoke.com/api
            * So it requires the Accpet header and need that application/json type stuff
            * in order to provide us with json data, which is easier to work with
            */
            let res = await axios.get(JOKE_URL, { headers: { Accept: "application/json" } });
            // console.log(res);
            // let resData = `The joke is: ${res.data.joke}`;
            // console.log(resData);

            //here by using {} we are pushing an object, instead of string, to the jokes
            jokes.push({id:uuid(), text:res.data.joke, votes: 0});
        }
        console.log(jokes);
        this.setState({jokes: jokes});

    }
    handleVote(id,delta){
        this.setState((state)=>{
            jokes: state.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta}:j);
        })
    }
    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="smiley" />
                    <button className="JokeList-getmore">New Jokes</button>
                </div>
                
                <div className="JokeList-jokes">
                    {this.state.jokes.map( j => {
                        return <Joke 
                            key={j.id} 
                            votes={j.votes}  
                            text = {j.text} 
                            upvote = {()=> this.handleVote(j.id,1)}
                            downvote={() => this.handleVote(j.id, -1)} />
                    })}
                </div>
            </div>
        )
    }
}

export default JokeList;