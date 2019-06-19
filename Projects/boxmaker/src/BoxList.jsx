import React, { Component } from "react";
import Box from "./Box.jsx";

class BoxList extends Component {
  constructor(props) {
    super(props);
    // here if i did color: orange i would get an error
    // saying orange is not defined. So 
    // I have to make it a string
    this.state = { boxes: [{ width: 10, height: 40, color: "orange" }] };
  }
  render() {
    const boxes = this.state.boxes.map(box => (
      <Box width={box.width} height={box.height} color={box.color} />
    ));
    return (
      <div>
        <h1>Color Box Maker Thing</h1>
        {boxes}
      </div>
    );
  }
}

export default BoxList;
