import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DogList from "./DogList.jsx";
import DogDetails from "./DogDetails.jsx";

class Routes extends Component {
  render() {
    const getDog = props => {
      /*
       * https://www.freecodecamp.org/news/hitchhikers-guide-to-react-router-v4-4b12e369d10/
       * so basically match contains information about url, including params (recall params
       * are like this /dogs/:id, here the :id is params, so match.params will give access to
       * the value of id), so that is how we are getting what dog we are choosing
       * check how this function is called, if we call in that way, like instead of writing our
       * own arrow function in render, if we just call this function, it will automatically get all
       * required props.
       */
      let name = props.match.params.name;
      let currentDog = this.props.dogs.find(
        dog => dog.name.toLowerCase() === name.toLowerCase()
      );
      return <DogDetails {...props} dog={currentDog} />;
    };

    return (
      <Switch>
        <Route
          exact
          path="/dogs"
          render={() => <DogList dogs={this.props.dogs} />}
        />
        <Route
          exact
          path="/dogs/:name"
          /*
           * this is a bit weird, it will automatically call the getDog
           * function, and then pass the router props to that function
           * So our props will have all the info about the route
           * Similarly if we don't define our arrow function insdie render,
           * and use a pre-written/defined function, render will automatically
           * pass all the router props to that function argument.
           */
          render={getDog}
        />
        <Redirect to="/dogs"/>
      </Switch>
    );
  }
}

export default Routes;
