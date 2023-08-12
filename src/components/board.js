import {useReducer} from 'react';
import { createBoard } from '../utils/createBoard';
import { Cell } from './cell';
import { gameReducer } from '../reducers/gameReducer';

const BOARD_SIZE = 20;
const BOMBS_NUM = Math.floor((BOARD_SIZE ** 2) * 0.2);

export default function Board() {

  const [gameState, dispatch] = useReducer(gameReducer, {
    board: createBoard(BOARD_SIZE, BOARD_SIZE, BOMBS_NUM),
    gameOver: false,
  });

  function handleClick(row, col) {
    dispatch({type: 'HANDLE_CELL', row, col});
  }

  function handleContextMenu(row, col) {
    dispatch({type: 'HANDLE_CONTEXT', row, col});
  }
  
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
    }}>
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
