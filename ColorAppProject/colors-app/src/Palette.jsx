import React, { Component } from "react";
import ColorBox from "./ColorBox.jsx";
import Navbar from "./Navbar.jsx";
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

    const { colors, paletteName, emoji } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name} />
    ));
    return (
      <div className="Palette">
        {/* Navbar goes here */}

        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleFormatChange={this.changeFormat} />

        <div className="Palette-colors">
          {/* bunch of color boxes */}
          {colorBoxes}
        </div>
        {/* footer */}
        <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
