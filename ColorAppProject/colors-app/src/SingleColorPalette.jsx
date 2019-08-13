import React, { Component } from 'react';
import ColorBox from "./ColorBox.jsx";
import Navbar from "./Navbar.jsx";
import {Link} from 'react-router-dom';
import PaletteFooter from './PaletteFooter.jsx';

/*
* Here what we are doing is that, we will get the full palette
* if we look at app.js file. However, this file/component renders
* gradient/variation of single color. So for example, in
* color palette, when we have bunch of colors and can change the
* darkness/lightness with the slider, when we click on see more,
* lets say we clicked see more of red, this component should render
* all the different version (from lightest to darkest) red.
* So we have to somehow isolate all the red from the entire palettelist
* that is being passed here as props.
*/

export default class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex" };
        /*
        * The reason we are using underscore in variable name is:
        * https://stackoverflow.com/questions/44734399/what-is-the-underscore-in-javascript
        */
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeFormat(val) {
        this.setState({ format: val });
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        /*
        * So remember, the way our color palette is setup, is that
        * we have something like this
        * {
        *   100: [bunch of colors of shade 100],
        *   200: [bunch of colors of shade 200]
        *   and so on
        * }
        * So in order to gather lets say red, we have to loop through
        * all the arrays, and when looping through single array (let's 
        * say array of 100 shades colors), we have to filter all the colors
        * that match the id, so red or something, and then push/concat it
        * our shades variable
        * https://www.udemy.com/modern-react-bootcamp/learn/lecture/14384670#questions
        * Watch from 4:53
        *  
        */
        // return all shades of given color
        for (let key in allColors) {
            shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy))
        }
        /*
        * Now we have shade 50 color, as the way the palette is setup.
        * 50 is basically white color, we don't want that. So this will make 
        * sure we are discarding 0th index and keeping everything from 1st index
        * to onwards
        */
        return shades.slice(1);
    }

    render() {
        const { format } = this.state;
        const { paletteName, emoji, id} = this.props.palette;
        const colorBoxes = this._shades.map(color =>
            <ColorBox
                key={color.name}
                name={color.name}
                background={color[format]}
                showLink={false}
            />)
        return (
            <div className="SingleColorPalette Palette">
                <Navbar
                    handleFormatChange={this.changeFormat}
                    showingAllColors={false} />
                {this.props.paletteName}
                {this.props.emoji}
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">GO BACK</Link>
                    </div>


                </div>

                <PaletteFooter
                    paletteName={paletteName}
                    emoji={emoji}
                />
            </div>
        )
    }
}
