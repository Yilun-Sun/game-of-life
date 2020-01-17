import React from 'react';
import Canvas from './Canvas/Canvas';
import './App.css';
import { getGeneration } from './Canvas/Canvas';

let test1 = "Conway's Game of Life";
let test2 = "generations: ";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Heading2">{test1}</div>
        <div className="Heading3" id="gentext">{test2}</div>
        <Canvas id="canvas" />

      </header>
    </div>
  );
}

export default App;
export const setGen = (text) => {
  test2 = text;
}
