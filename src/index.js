import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// game should be 30x16
// 1 in every 5 squares contains a mine

function Square(props) {
  let val;
  if (props.value.is_hidden) {
    val = null;
  } else if (props.value.has_mine) {
    val = '*';
  } else {
    val = props.value.num_mine_neighbors;
  }
  
  return (
    <button
      id={props.value.id}
      className='square'
      onClick={() => props.onClick(props.value.row_id,props.value.col_id)}>
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
        <div className='board-row'>
          {this.renderRow(board[i])}
        </div>
      );
    }
    return cols;
  }
      
  renderSquare(i) {
    return (
      <Square
        value={i}
        onClick={(rowId,colId) => this.props.onClick(rowId,colId)}/>
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

  handleClick(rowId,colId) {
    let squares = this.state.board;
    squares[rowId][colId].is_hidden = false;
    this.setState({board: squares});
  }

  createBoard(width, height) {
    // TODO: include x y coords within cell to access its contents within the
    // board, enabling the ability to change its state

    // Create empty board
    let boardList = Array(width*height).fill(null);
    // randomly generate ids to assign mines to
    let mineIds = this.createMineIds(boardList.length);
    // place mines in cells based on mineId array
    let board = this.setMines(boardList, mineIds);
    // slice array into multi-dimensional array
    let boardArr = [];
    for (let i = 1; i <= height; i++)
      boardArr.push(boardList.slice((width*i)-width,width*i));

    boardArr = this.getNeighboringMines(width, height, boardArr);
    
    return boardArr;

  }
  
  getNeighboringMines(width, height, boardArr) {
    for (let rowId=0; rowId < height; rowId++) {
      for (let colId=0; colId < width; colId++) {
        boardArr[rowId][colId].row_id = rowId;
        boardArr[rowId][colId].col_id = colId;

        let neighbor = [
          [rowId-1,colId-1],[rowId-1,colId],[rowId-1,colId+1],
          [rowId,colId-1],                  [rowId,colId+1],
          [rowId+1,colId-1],[rowId+1,colId],[rowId+1,colId+1]
        ];
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
            boardArr[rowId][colId].num_mine_neighbors++;
          }
        }
      }
    }
    return boardArr;
  }

  containsMine(board, rowId, colId) {
    return board[rowId][colId].has_mine;
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

  setMines(board, mineIds) {
    for (let i = 0; i < board.length; i++) {
      board[i] = {
        id: i,
        row_id: null,
        col_id: null,
        has_mine: false,
        is_hidden: true,
        is_flagged: false,
        num_mine_neighbors: 0
      };
      
      if (mineIds.includes(i)) {
        board[i].has_mine = true;
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
             board={this.state.board}
             onClick={(rowId,colId) => this.handleClick(rowId,colId)}
           />;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game/>
  </React.StrictMode>
);
