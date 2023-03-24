import React from 'react';
import {useState, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// game should be 30x16
// 1 in every 5 squares contains a mine


function Board({board_x, board_y, board}) {
  let boardList = [];
  let boardRow = [];
  let rowKey = 0;
  for (let i=0; i < board.length; i++) {
    boardRow.push(<Square key={board[i].id} value={board[i].id}></Square>);
    if (boardRow.length === board_x) {
      boardList.push(<div key={rowKey} className="board-row">{boardRow}</div>);
      rowKey++;
      boardRow = [];
    }
  }  
  return (
    <div>
      {boardList}
    </div>
  );
}

function Square({value}) {
  return (
    <button className="square">{value}</button>
  );
}

function Game() {
  let [board_x, setBoard_x] = useState(3);
  let [board_y, setBoard_y] = useState(3);
  let [mineDensity, setMineDensity] = useState(0.2);
  let [board, setBoard] = useState([]);

  const createMineIds = useCallback((mineDensity, boardSize) => {
    let mineIds = [];
    let numMines = Math.floor(boardSize * mineDensity);
    while (mineIds.length < numMines) {
      let num = Math.floor(Math.random() * boardSize);
      if (!mineIds.includes(num)) {
        mineIds.push(num);
      }
    }
    return mineIds;
  }, []);
  
  const createBoard = useCallback((x,y, mineDensity) => {
		let boardSize = x * y;
		let newBoard = [];
    let mineIds = createMineIds(mineDensity, boardSize);
		for (let i = 0; i < boardSize; i++) {
      if (mineIds.includes(i)) {
				newBoard.push({
					id: i,
					has_mine: true,
					is_hidden: true,
					is_flagged: false,
					num_mine_neighbors: 0
			  });
      } else {
        newBoard.push({
					id: i,
					has_mine: false,
					is_hidden: true,
					is_flagged: false,
					num_mine_neighbors: 0
			  });
      }
		}
		setBoard(newBoard);
  }, [createMineIds]);

  useEffect(() => {
    createBoard(board_x,board_y, mineDensity);
  }, [createBoard, board_x, board_y, mineDensity]
           );

  function changeBoard(event) {
    setBoard_x(parseInt(event.target.width.value));
    setBoard_y(parseInt(event.target.height.value));
    setMineDensity(parseFloat(event.target.mineDensity.value));
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
				
        <div>
					<label> Enter mine density (between 0 and 1):
						<input type="text" name="mineDensity" />
					</label>
				</div>
        <input type="submit" value="submit" />
      </form>
    );
  }


  return (
    <div>
      <BoardSizeForm/>
      <div>
        <Board
          board_x={board_x}
          board_y={board_y}
          board={board}
        />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game/>
  </React.StrictMode>
);
