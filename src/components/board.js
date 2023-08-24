import {useReducer} from 'react';
import { createBoard } from '../utils/createBoard';
import { Cell } from './cell';
import { gameReducer } from '../reducers/gameReducer';
import BoardOptions from './boardoptions';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;
const BOMBS_NUM = Math.floor((BOARD_WIDTH * BOARD_HEIGHT) * 0.2);

export default function Board() {

  const [gameState, dispatch] = useReducer(gameReducer, {
    board: createBoard(BOARD_WIDTH, BOARD_HEIGHT, BOMBS_NUM),
    gameOver: false,
  });

  function handleClick(row, col) {
    dispatch({type: 'HANDLE_CELL', row, col});
  }

  function handleContextMenu(row, col) {
    dispatch({type: 'HANDLE_CONTEXT', row, col});
  }

  function handleBoardOptions(e) {
    let boardVals = [e.width.value, e.height.value, e.mine_density.value];
    dispatch({type: 'NEW_BOARD',
              width: e.width.value,
              height: e.height.value,
              mine_density: e.mine_density.value});
  }
  
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
    }}>
      <BoardOptions handler={handleBoardOptions}/>
      <div>{gameState.gameOver ? "Game Over!" : "Minesweeper"}</div>
			{gameState.board.map((row, rowIdx) => (
				<div key={rowIdx}>
					{row.map((cell, cellIdx) => (
						<Cell
							key={cellIdx}
							handleClick={handleClick}
							handleContextMenu={handleContextMenu}
							{...cell} />
					))}
				</div>
      ))}
    </div>
  );
}
