import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// game should be 30x16
// start with 10x10
// 1 in every 5 squares contains a mine

function Square(props) {
  return (
    <button className="square">
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 30,
      height: 16,
      board: [],
    };
    this.createBoard(this.state.width,this.state.height);
  }

  createBoard(width, height) {
    let arr = this.state.board;
    arr.splice(0);
    let row;
    for (let i = 0; i < height; i++) {
      row = Array(width).fill(0);
      arr.push(row);
    }
    this.setState({board: arr});
  }

  renderSquare(i) {
    return (
      <Square
        value={i} />
    );
  }

  renderRow(width) {
    let row = [];
    for (let i = 0; i < width.length; i++) {
      row.push(this.renderSquare(width[i]));
    }
    return <div className='board-row'>{row}</div>;
  }

  renderHeight(height, width) {
    let cols = [];
    let rows;
    for (let i = 0; i < height; i++) {
      rows = Array.from({length: width*height}, (_,x) => x);
      cols.push(this.renderRow(rows.slice(i*width,(i*width)+width)));
    }
    return <div>{cols}</div>;
  }

  render() {
    return (
      <div>
        <div>
          {this.renderHeight(this.state.height, this.state.width)}
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render () {
    return <Board/>;
  }
}





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
