import React, { Component } from "react";
import Palette from "./Palette.jsx";
import "./App.css";
import seedColors from "./seedColors.jsx";
import { generatePalette } from "./colorHelper";
import { Route, Switch } from "react-router-dom";
import Palettelist from "./Palettelist.jsx";
import SingleColorPalette from "./SingleColorPalette.jsx";

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
  /*
   * we need to find the palette from the id from
   * the seedcolors file
   * So what this is doing is that it tries to find the palette id that
   * matches the one on the seedcolor
   * So after finding it, the find function will return the palette.
   * However, we need to return that again from our  findPallatte function to
   * whomever called this funciton. So we need to return the palette that we found using find
   * function to the calling function, otherwise the find function will return the palette
   * but thne findPallete function will just grab it and sit quitely. In order to pass it to
   * the calling function, we need to return that thing again from find funciton.
   */
  findPallette(id) {
    return seedColors.find(palette => {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <Palettelist palettes={seedColors} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            /*
             * Our paletter component is written in such a way that it expects the full pallete
             * information. So just supplying the palltee with id is not enough, we need to break
             * down that paletter in a way that is consumable for the Palette component. The function
             * generatePalette does that for us. So we need to pass in the palette to that function
             */
            <Palette
              palette={generatePalette(
                this.findPallette(routeProps.match.params.id)
              )}
            />
          )}
        />

        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            /*
             * Our paletter component is written in such a way that it expects the full pallete
             * information. So just supplying the palltee with id is not enough, we need to break
             * down that paletter in a way that is consumable for the Palette component. The function
             * generatePalette does that for us. So we need to pass in the palette to that function
             */
            <SingleColorPalette
              colorId = {routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPallette(routeProps.match.params.paletteId)
              )}
            />
          )}
          />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
