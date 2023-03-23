import React from 'react';
import {useState, useCallback} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// game should be 30x16
// 1 in every 5 squares contains a mine


function Board(width, height) {
  return (
    <div>board</div>
  );
}

function Square(value) {
  return (
    <button className="square">{value}</button>
  );
}

function Game() {
  let [board_x, setBoard_x] = useState(1);
  let [board_y, setBoard_y] = useState(4);
  let [board, setBoard] = useState([]);

  function createBoard() {
    let boardSize = board_x * board_y;
    let newBoard = [];
    for (let i = 0; i < boardSize; i++) {
      newBoard.push({id: i,
                  has_mine: false,
                  is_hidden: true,
                  is_flagged: false,
                  num_mine_neighbors: 0});
    }
    setBoard(newBoard);
  }

  function changeBoard(event) {
    setBoard_x(parseInt(event.target.width.value));
    setBoard_y(parseInt(event.target.height.value));
    createBoard(board_x, board_y);
  }

  function BoardSizeForm() {
    return (
			<form onSubmit={(e) => changeBoard(e)}>
				<div>
					<label> Enter Width:
						<input type="text" name="width" />
					</label>
        </div>
        <div>
					<label> Enter Height:
						<input type="text" name="height" />
					</label>
				</div>
				<input type="submit" value="submit" />
      </form>
    );
  }


  return (
    <div>
      <BoardSizeForm/>
      <div>{}</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game/>
  </React.StrictMode>
);
