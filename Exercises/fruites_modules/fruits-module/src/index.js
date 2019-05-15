import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    choice,
    remove
} from './helper';
import fruits from './foods';

  function logic() {
      var fruit = choice(fruits);
      console.log("i would like one" + fruit + ", pls");
      console.log("Here you go:" + fruit);
      remove(fruits, fruit);
      console.log("I am sorry, we are all out. We have" + fruits + "left");
  }

logic();
ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
