import React, {Component} from 'react';
import Card from './Card.jsx';
import './Deck.css';
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component{
    constructor(props){
        super(props);
        this.state = {deck : null, drawnCards: []}
        this.getCard = this.getCard.bind(this);
    }

    /*
    * Axios documentation: https://www.npmjs.com/package/axios
    * Basically we use it to make http request, that is why we are using it here
    * Also the plain reason we are using async, because it will take some time to get
    * the data using axios, so we want to wait some time and only after getting the data
    * we want to do other stuff. That is why we are using async-await function. I wrote 
    * details in my google doc for EC6 Javascript.
    * We could use promise and resolve method, but this is cleaner
    */
    async componentDidMount(){
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({deck: deck.data});
    }

    async getCard(){
        //make request using deck id
        let deck_id = this.state.deck.deck_id;
        /*
        * The reason we are putting stuff inside a try block, is 
        * if user keeps clicking the button which will trigger this function,
        * at one stage, the deck will be exhausted (the deck only has 52 cards)
        * So that is why we wrap the code in a try catch block
        */
        try{
            let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
            let cardResponse = await axios.get(cardUrl);
            // the data.success is false if it can't send any more card, whether it 
            // is because the deck is exhausted or for any other issue
            if(!cardResponse.data.success) {
                throw new Error("No cards remaining");
            }
            console.log(cardResponse);
            //set state using new card info from api
            let card = cardResponse.data.cards[0];
            this.setState(oldState => ({
                drawnCards: [
                    ...oldState.drawnCards,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.suit} ${card.value}`
                    }
                ]
            }));
        } catch(err){
            alert(err);
        }


    }
    render(){
        const cards = this.state.drawnCards.map(c => {
            return <Card key={c.id} name={c.name} image={c.image}/>
        });
        return(
            <div className="row">
                <div className="col-12">
                    <h1 className="Deck-title">Card Dealer</h1>
                    <h2 className="Deck-title subtitle">A little demo made with React</h2>
                    <button className="btn btn-primary" onClick={this.getCard}>Get Card!</button>
                </div>
                <div className="col">
                    <div className="Deck-cardarea">{cards}</div>
                </div>  
            </div>
        )
    }
}

export default Deck;