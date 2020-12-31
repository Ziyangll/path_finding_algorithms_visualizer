import React from 'react';
import './App.css';
import Board from './components/Board'
function App() {
  let width = 30;
  let height = 10
  let start_x = Math.floor(Math.random() * Math.floor(height));
  let start_y = Math.floor(Math.random() * Math.floor(width));
  let end_x = randomNumber(0, height-1, start_x);
  let end_y = randomNumber(0, width-1, start_y);
  return (
    <div className="App">
      <header className="App-header">
        <h2>BFS</h2>
        <Board width={width} height={height} start_x={start_x} start_y={start_y} end_x={end_x} end_y={end_y}/>
      </header>
    </div>
  );
}

function randomNumber(max: number, min: number, except: number): number {
    let num = Math.floor(Math.random() * (max - min +1)) + min;
    return (num === except) ? randomNumber(max, min, except) : num;
}

export default App;
