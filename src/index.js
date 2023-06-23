import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// game should be 30x16
// 1 in every 5 squares contains a mine


function Board({board_x, board_y, board}) {
  let boardSquares = [];
  for (let i=0; i < board_y; i++) {
    let boardRow = [];
    for (let j=0; j < board_x; j++) {
      boardRow.push(<Square
                      key={board[i][j].id}
                      value={board[i][j]}></Square>);
      
    }
		boardSquares.push(<div
			                  key={i}
			                  className="board-row">{boardRow}</div>);
		boardRow = [];
  }
  return (
    <div>
      {boardSquares}
    </div>
  );
}

function Square({value}) {
  return (
    <button className="square">{value.mine}</button>
  );
}


function Game() {
  let [board_x, setBoard_x] = useState(3);
  let [board_y, setBoard_y] = useState(3);
  let [mineDensity, setMineDensity] = useState(0.2);
  let [board, setBoard] = useState(createBoard(board_x,board_y,mineDensity));

  function createMineIds(mineDensity, boardSize) {
	let mineIds = [];
	let numMines = Math.floor(boardSize * mineDensity);
	while (mineIds.length < numMines) {
		let num = Math.floor(Math.random() * boardSize);
		if (!mineIds.includes(num)) {
			mineIds.push(num);
		}
	}
	return mineIds;
  }

  function getNeighbors(x_bound,y_bound,curr_y,curr_x) {
    let potentialNeighborIds = [
      [curr_y-1,curr_x-1],[curr_y-1,curr_x],[curr_y-1,curr_x+1],
      [curr_y  ,curr_x-1]                  ,[curr_y  ,curr_x+1],
      [curr_y+1,curr_x-1],[curr_y+1,curr_x],[curr_y+1,curr_x+1]
    ];
    let neighborIds = [];
    for (let i = 0; i < potentialNeighborIds.length; i++) {
      let neighbor_y = potentialNeighborIds[i][0];
      let neighbor_x = potentialNeighborIds[i][1];
      
      if ((neighbor_y >= 0 && neighbor_y < y_bound) && (neighbor_x >= 0 && neighbor_x < x_bound)) {
        neighborIds.push( (potentialNeighborIds[i][0]*y_bound)+potentialNeighborIds[i][1] );
      }
    }
    return neighborIds;
  }

	function createBoard(x, y, mineDensity) {
		let boardSize = x * y;
		let newBoard = [];
		let mineIds = createMineIds(mineDensity, boardSize);
    for (let i = 0; i < y; i++) {
      let boardRow = [];
      for (let j = 0; j < x; j++) {
        let id = (i * y) + j;

        let neighborIds = getNeighbors(x,y,i,j);

        let numMineNeighbors = 0;
        for (let k = 0; k < neighborIds.length; k++) {
          if (mineIds.includes(neighborIds[k])) {
            numMineNeighbors++;
          }
        }
        if (mineIds.includes((i * y) + j)) {
          boardRow.push({
            id: id,
            has_mine: true,
            is_hidden: true,
            is_flagged: false,
            num_mine_neighbors: numMineNeighbors,
            neighbor_ids: neighborIds,
            mine: '*'
          });
        } else {
          boardRow.push({
            id: id,
            has_mine: false,
            is_hidden: true,
            is_flagged: false,
            num_mine_neighbors: numMineNeighbors,
            neighbor_ids: neighborIds,
            mine: ''
          });
        }
      }
      newBoard.push(boardRow);
	  }
    return newBoard;
  }
  

  function changeBoard(event) {
    let new_x = event.target.width.value ? parseInt(event.target.width.value) : 3;
    let new_y = event.target.height.value ? parseInt(event.target.height.value) : 3;
    let newMineDensity = event.target.mineDensity.value ? parseFloat(event.target.mineDensity.value) : 0.2;
    setBoard_x(new_x);
    setBoard_y(new_y);
    setMineDensity(newMineDensity);
    setBoard(createBoard(new_x,new_y,newMineDensity));
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
