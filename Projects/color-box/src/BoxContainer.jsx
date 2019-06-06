import React, {Component} from 'react';
import Box from './Box.jsx';
import './BoxContainer.css';

class BoxContainer extends Component{
    static defaultProps = {
        numBoxes: 18,
        allColors: [
            "purple", 
            "magenta", 
            "violet", 
            "pink", 
            "green",
            "orange",
            "blue", 
            "red"]
    }
    render(){
        //so when we are passing lenght value 
        //to Array.from, it creates a new array of 
        // whatever the value we are passing in, then 
        // we iterate over every single one of the newly created
        //empty elements and do stuff
        const boxes = Array.from({ length: this.props.numBoxes }).map(
            //so this means every single array element will
            // have a box component
            () => <Box colors = {this.props.allColors}/>
        );
        return(
            <div className="BoxContainer">
                {boxes}
            </div>
        );
    }
}

export default BoxContainer;