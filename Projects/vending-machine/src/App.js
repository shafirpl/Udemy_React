import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Chips from './Chips';
import Soda from './Soda';
import Sardines from './Sardines';
import VendingMachine from './VendingMachine';
import Navbar from './Navbar.jsx';
import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <VendingMachine />} />
        <Route exact path="/soda" render={() => <Soda />} />
        <Route exact path="/sardines" render={() => <Sardines />} />
        <Route exact path="/chips" render={() => <Chips />} />
      </Switch>
      
    </div>
  );
}

export default App;
