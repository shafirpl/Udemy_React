import React, { useReducer } from 'react';
import './App.css';


/*
* This is our reducer function
* this is the function that we will pass to the useReducer hook
* It usually takes two arguments, a state and an action
* and based on the type of action it does different
* thing on the state
*/

/*
* This is without the second argument
*/

// const reducer = (state, action) =>{
//   if(action.type === "INCREMENT") return { count : state.count + 1};
//   if (action.type === "DECREMENT") return { count: state.count - 1 };
// }

// this is with the second argument but still using if
// we usually use switch case to write these functions
// const reducer = (state, action) => {
//   if (action.type === "INCREMENT") return { count: state.count + 1 };
//   if (action.type === "DECREMENT") return { count: state.count - 1 };
//   if (action.type === "INCREMENT5") return {count: state.count + action.amount};
//   if (action.type === "DECREMENT5") return { count: state.count - action.amount };
// }

/*
* Usually reducer functions are written in switch case statements
*/

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: state.count - 1 };

    case "INCREMENT5":
      return { count: state.count + action.amount };

    case "DECREMENT5":
      return { count: state.count - action.amount };

    case "RESET":
      return { count: 0 }

    default:
      return { count: state.count }

  }


}


function App() {
  /*
  * So the way we use useReducer, is that 
  * we pass a function that will do something with the state
  * and an initial state
  * That function will update the state based on action type
  * 
  * useReducer will return two things, a state, as well as
  * a function which we traditionally call dispatch
  * 
  * Now useReducer is kind of similar to useState, which returns
  * a state and a function to update the state. The difference is,
  * in useState we cannot specify what type of action or operation
  * we want. Here we can define what kind of operation we want
  * on the state.
  * 
  * So in order to actually use this and to update the state, just like
  * useState returned function, we have to call the returned function,
  * which in our case is called dispatch, and pass an argument to specify
  * what type of operation we want to perform
  * 
  * Here we decided to use type, but we can use any name we want.
  * Lets say we decided to use operation, then instead of action.type,
  * we would use action.operation, as well as in the dispatch function we 
  * would pass operation: "INCREMENT" or something like this
  * 
  */
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <div className="App">
      <h1>{state.count}</h1>
      <button
        className="btn btn-primary"
        onClick={() => { dispatch({ type: "INCREMENT" }) }}>Add 1</button>
      <button
        className="btn btn-warning"
        onClick={() => { dispatch({ type: "DECREMENT" }) }}>Substract 1</button>

      {/* 
      * We could also pass more argument, which is usally called the 
      * payload
      */}

      <button
        className="btn btn-success"
        onClick={() => { dispatch({ type: "INCREMENT5", amount: 5 }) }}>Add 5</button>
      <button
        className="btn btn-info"
        onClick={() => { dispatch({ type: "DECREMENT5", amount: 5 }) }}>Decrement 5</button>
      <button
        className="btn btn-danger"
        onClick={() => { dispatch({ type: "RESET" }) }}>Reset</button>
    </div>
  );
}

export default App;
