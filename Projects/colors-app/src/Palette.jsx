import React, { Component } from "react";
import ColorBox from './ColorBox.jsx';

class Palette extends Component {
    render() { 
        /*
        * This is for my own reference, if we
        * were using {} and return and had multiple
        * items
        */
        // const colorBoxes = this.props.colors.map(
        //     (color) => {
        //         return (<div>
        //             <ColorBox background={color} />
        //             <h1>Hello</h1>
        //         </div>)
                
        // }
        // );

        const colorBoxes = this.props.colors.map(
            (color) => (
                <ColorBox background={color.color} name={color.name}/>
            )
        );
        return (
            <div className="Palette">
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                { /* footer */}
            </div>
        );
    }
}

export default Palette;