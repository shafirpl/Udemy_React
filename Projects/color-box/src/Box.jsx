import React, {
    Component
} from 'react';
import {
    choice
} from './helpers.jsx';
import './Box.css';

class Box extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            color: choice(this.props.colors)
        };
        this.handleclick = this.handleclick.bind(this);
    }

    pickColor() {
        let newColor;

        // This means run the loop as long as the new color matches the old color, 
        // and when it won't match, the loop will break out
        do {
            newColor = choice(this.props.colors);
        } while (newColor === this.state.color)

        this.setState({color:newColor});
    }

    handleclick() {
        this.pickColor();
    }


    render() {
        return (<div className="Box"
            style={
                {
                    backgroundColor: this.state.color
                }
            }
            onClick={
                this.handleclick
            } >

        </div>
        );
    }
}

export default Box;