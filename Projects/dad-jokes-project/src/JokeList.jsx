import React, { Component } from 'react';
import Joke from "./Joke.jsx";
import uuid from 'uuid/v4';
import axios from 'axios';
import './JokeList.css';

const JOKE_URL = "https://icanhazdadjoke.com/";

/*
* In order for avoiding duplication, we are using set. THe reason is: if we did something like
* before pushing the fetched joke, check every element of the jokes array to see if it is duplicated, 
* it would take like O(n), which is not good. Set is a good alternative since set uses hash algorithm to effeciently
* check if something is duplicated or not.
*/

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10,
    }

    constructor(props) {
        super(props);
        this.loading = false;
        
        this.handleClick = this.handleClick.bind(this);
        /*
        * Json parse method makes a string to object
        * here we are converting the stored string value of jokes from local storage back
        * to object and then taking them to the state
        * 
        * This is kind of hacky way, what it is saying that parse the empty array at the end of 
        * jokes, so if JSON.parse doens't find anything, we will get an empty array on the jokes.
        * Otherwise, we will get the localstored jokes and an empty array
        */
        this.state = { jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]") };

        this.seenJokes = new Set(this.state.jokes.map(j=> j.text));
    }
     componentDidMount() {
        if(this.state.jokes.length === 0){
            this.getJokes();
        }
       
    }

    async getJokes(){
        let jokes = [];
        /*
        * The reason we have a try catch block is because if 
        * let's say the server went down or api went down or something, our app 
        * would hung up if we don't use a try catch block. With this,
        * our app would send an error message if it can't fetch the jokes
        */
        try{
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

                //checking to see if the joke already exists or not
                let newJoke = res.data.joke;
                if (!this.seenJokes.has(newJoke)) {
                    //here by using {} we are pushing an object, instead of string, to the jokes
                    jokes.push({ id: uuid(), text: newJoke, votes: 0 });
                } else {
                    console.log("Found a Duplicate");
                    console.log(newJoke);
                }

            }
            console.log(jokes);
            // this.setState({ jokes: jokes });
            /*
            * We are adding more jokes to the existing jokes array, as that is what the new jokes button is supposed to do
            * so we are combining the existing jokes with the new jokes using the spread operator here
            * Basically ...state.jokes will put all the elements from our previous state jokes to the array, and then
            * ...jokes will add all the elements from the jokes array (created using the while loop) to this array
            */
            this.setState((state) => {
                return { jokes: [...state.jokes, ...jokes], loading: false }
            },
                /*
                * here we are storing the jokes
                * window.localstorage takes a key value pair
                * And the value can only be string, but our jokes are object
                * So we need to convert them to string, which we can do
                * using json.stringify
                */
                () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            )
        }
         catch(error){
            alert(error);
            this.setState({loading: false});
         }
        
        

    }

    handleClick(){
        this.setState({ loading: true }, this.getJokes);
        
    }

    handleVote(id,delta){
        //this line could be written in a way where we don't neede to use return statement.
        // look at the commented code below 
        // basically wrap line 45 in a (), get rid of return statement as well as {} from the return statement
        this.setState((state)=>{
           return {jokes: state.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta}:j)} 
        }, () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)) );

        // this.setState((state) => ({
        //  jokes: state.jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j) 
        // }),
        // () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));

        
    }
    render() {
        if(this.state.loading){
            return (<div className="JokeList-spinner">
                {/* the fa-laugh will show the laughing face, and the fa-spin will spin the icon around
                no external css is being used for the spining, it is just fa-spin
                https://fontawesome.com/v4.7.0/examples/
                 */}
                <i className="far fa-8x fa-laugh fa-spin"></i>
                <h1 className="JokeList-title">Loading...</h1>
            </div>
            );
        }
        //sorting the jokes based on the votes
        let jokes = this.state.jokes.sort((a,b)=>b.votes-a.votes);
        /* this is euqivalent to 
        * this.state.jokes.sort((a,b)=>{return b.votes-a.votes})
        * https://www.w3schools.com/js/js_array_sort.asp
        * https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_alpha
        * Read those two url to see how this sort array works
        * In the above example, they went from low to high, if we want to go high to low
        * we do the oppsite, or second item- first item instead of first item- second item
        */

        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="smiley" />
                    <button className="JokeList-getmore" onClick={this.handleClick}>Fetch Jokes</button>
                </div>
                
                <div className="JokeList-jokes">
                    {jokes.map( j => {
                        return <Joke 
                            key={j.id} 
                            votes={j.votes}  
                            text = {j.text} 
                            /* 
                            * another way was to pass handleVote to the Joke component,
                            * and in the Joke Component define another function on the button,
                            * lets say that defined function name is childHandleVote, and we would do
                            * something like <button onClick = this.childHandleVote(). Bind that to
                            * the constructor, and in the childHandleVote, do something like
                            * this.props.upvote(key,1) since key = j.id and 1 = delta
                            */
                            upvote = {()=> this.handleVote(j.id,1)}
                            downvote={() => this.handleVote(j.id, -1)} />
                    })}
                </div>
            </div>
        )
    }
}

export default JokeList;