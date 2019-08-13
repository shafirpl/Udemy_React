import React, { Component } from "react";
import ColorBox from "./ColorBox.jsx";
import Navbar from "./Navbar.jsx";
import PaletteFooter from './PaletteFooter.jsx';
import "./Palette.css";


class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({ level: newLevel });
  }

  changeFormat(val) {
    this.setState({ format: val });
  }
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

    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        id = {color.id}
        background={color[format]}
        name={color.name}
        paletteId = {id} 
        showLink = {true}
        moreUrl= {`/palette/${id}/${color.id}`}/>
    ));
    return (
      <div className="Palette">
        {/* Navbar goes here */}

        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          showingAllColors={true}
          handleFormatChange={this.changeFormat} />

        <div className="Palette-colors">
          {/* bunch of color boxes */}
          {colorBoxes}
        </div>
        {/* footer */}
        <PaletteFooter
          paletteName={paletteName}
          emoji={emoji}
        />
      </div>
    );
  }
}

export default Palette;
