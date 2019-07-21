import React, { Component } from "react";
import ColorBox from "./ColorBox.jsx";
import Navbar from "./Navbar.jsx";
import "./Palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({ level: newLevel });
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

    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        {/* Navbar goes here */}

        <Navbar 
            level={level}
            changeLevel = {this.changeLevel}/>

        <div className="Palette-colors">
          {/* bunch of color boxes */}
          {colorBoxes}
        </div>
        {/* footer */}
      </div>
    );
  }
}

export default Palette;
