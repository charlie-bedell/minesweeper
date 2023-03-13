import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// game should be 30x16
// 1 in every 5 squares contains a mine

function Square(props) {
  let val;
  if (props.value[0] !== null) {
    val = props.value[0];
  } else {
    val = props.value[1];
  }
  return (
      <button className='square'>
        {val}
      </button>
    );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      board: this.props.board,
    };
  }

  renderRow(row) {
    let squares = [];
    for (let i = 0; i < row.length; i++) {
      squares.push(this.renderSquare(row[i]));
    }
    return squares;
    
  }

  renderBoard(board) {
    let cols = [];
    for (let i = 0; i < board.length; i++) {
      cols.push(
        <div className='board-row'>{this.renderRow(board[i])}</div>
      );
    }
    return cols;
    
    
  }
      
      

  renderSquare(i) {
    return (
      <Square
        value={i} />
    );
  }

  render() {
    return (
      <div>
        {this.renderBoard(this.state.board)}
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 10,
      height: 10,
      mineDensity: 0.2,
    };

    this.state.board = this.createBoard(this.state.width, this.state.height);
  }

  createBoard(width, height) {
    let board = Array(width*height).fill(null);
    let mineIds = this.createMineIds(board.length);
    let boardList = this.setMines(board, width, height, mineIds);
    let boardArr = [];
    for (let i = 1; i <= height; i++)
      boardArr.push(boardList.slice((width*i)-width,width*i));

    boardArr = this.getNeighboringMines(width, height, boardArr);
    
    return boardArr;

  }

  getNeighboringMines(width, height, boardArr) {
    for (let rowId=0; rowId < height; rowId++) {
      for (let colId=0; colId < width; colId++) {
        let neighbor = [[rowId-1,colId-1],[rowId-1,colId],[rowId-1,colId+1],
                        [rowId,colId-1],                  [rowId,colId+1],
                        [rowId+1,colId-1],[rowId+1,colId],[rowId+1,colId+1]];
        for (let neighborId = 0; neighborId < neighbor.length; neighborId++) {
          let neighborRow = neighbor[neighborId][0];
          let neighborCol = neighbor[neighborId][1];

          if ((neighborRow < 0) ||
              (neighborRow >= height) ||
              (neighborCol < 0) ||
              (neighborCol >= width)) {
            neighbor[neighborId] = null;
          }
        }
        let validNeighbors = neighbor.filter(x => x !== null);
        for (let i = 0; i < validNeighbors.length; i++) {
          if (this.containsMine(boardArr,validNeighbors[i][0],validNeighbors[i][1])) {
            boardArr[rowId][colId][1]++;
          }
        }
      }
    }
    return boardArr;
  }

  containsMine(board, rowId, colId) {
    if (board[rowId][colId][0] === '*') {
      return true;
    } else {
      return false;
    }
  }
  

  createMineIds(boardSize) {
    let mineIds = [];
    let mineDensity = this.state.mineDensity;
    let numMines = Math.floor(boardSize * mineDensity);
    while (mineIds.length < numMines) {
      let num = this.generateRandomNumber(boardSize);
      if (!mineIds.includes(num)) {
        mineIds.push(num);
      }
    }
    return mineIds;
  }

  setMines(board, width, height, mineIds) {
    for (let i = 0; i < board.length; i++) {
      if (mineIds.includes(i)) {
        board[i] = ['*',0,true,false]; // has_mine, num_mine_neighbors, is_hidden, is_flagged
      } else {
        board[i] = [null,0,true,false];
      }
    }
    return board;
  }

  generateRandomNumber(max) {
    let num = Math.floor(Math.random() * max);
    return num;
  }
  
  render () {
    return <Board
             width={this.state.width}
             height={this.state.height}
             board={this.state.board}/>;
  }
}





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
