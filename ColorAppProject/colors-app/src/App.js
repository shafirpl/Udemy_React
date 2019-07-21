import React, { Component } from "react";
import Palette from "./Palette.jsx";
import "./App.css";
import seedColors from "./seedColors.jsx";
import { generatePalette } from "./colorHelper";

/*
* If we look at the seedcolors component,
* the whole component is a big array of objects. Every element in
* that array is an object that contains another array of 
* colors object (in which every object has a color code and a color name)
* paletteName, id and emoji. So seedColors[4] will give us the fourth object, which has 
* the paletteName: "Flat UI Colors Aussie", emoji as australian flag.
* Now ... means that whatever passed there will be sperate, like this
* (look at the google docs). So it will allow us to use something like this.props.colors to
* access the colors array, or this.props.id to access the passed id in the Paletter.jsx
* if we didn't have the spread (...) operator, then we would have to do something like
* Look at the goole docs

*/

class App extends Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    );
  }
}

export default App;
