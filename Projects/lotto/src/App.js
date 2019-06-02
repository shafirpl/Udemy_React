import React from 'react';
import Ball from './ball.jsx'
import './App.css';

import Lottery from './Lottery.jsx';

function App() {
  return (
    <div className="App">
      <Lottery />
      <Lottery title='Mini Daily' maxNum = {10} maxBalls = {4}/>
    </div>
  );
}

export default App;
