import { getNeighbors, createBoard } from "../utils/createBoard";

export function gameReducer(state, action) {
  const {type, row, col} = action;

  switch (type) {
		case "HANDLE_CELL": {
			if (state.board[row][col].has_mine) {
				return {
					...state,
					board: flipAll(state.board),
          gameOver: true,
				};
			} else if (state.board[row][col].num_mine_neighbors === 0) {
				return {
					...state,
					board: expand(row, col, state.board),
				};
			} else {
				return {
					...state,
					board: flipCell(row, col, state.board),
				};
			}
		}

  case "HANDLE_CONTEXT": {
    if (state.board[row][col].is_hidden && state.board[row][col].is_flagged) {
			return {
				...state,
				board: toggleFlagOff(row, col, state.board),
      };
    } else if (state.board[row][col].is_hidden && !state.board[row][col].is_flagged) {
      return {
        ...state,
        board: toggleFlagOn(row, col, state.board),
      };
    } else {
      return {
        ...state,
      };
    }
  }

  case "NEW_BOARD": {
    console.log(action);
    const width = action.width;
    const height = action.height;
    const mine_density = action.mine_density;
    const bombs_num = Math.floor((width * height) * mine_density);
    return {
      ...state,
      gameOver: false,
      board: createBoard(width, height, bombs_num),
    };
  }
    
		default: {
			console.log('error, unknown action: ' + action);
		}
	}
}

function flipCell(row, col, board) {
  const newBoard = board.slice();
  const cell = newBoard[row][col];
  const newCell = {
    ...cell,
    is_hidden: false,
  };
  newBoard[row][col] = newCell;
  return newBoard;
}

function flipAll(board) {
  let newBoard = board.slice();
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[0].length; col++) {
      flipCell(row,col,newBoard);
    }
  }
  return newBoard;
}

function expand(row, col, board) {
  const newBoard = board.slice();
  const stack = [[row, col]];
  while (stack.length > 0) {
    const [row, col] = stack.pop();
    const neighbors = getNeighbors(row, col, newBoard);

    for (const neighbor of neighbors) {
      const [row,col] = neighbor;
      if (!newBoard[row][col].is_hidden) continue;
      if (!newBoard[row][col].has_mine) {
        newBoard[row][col].is_hidden = false;
        // flipCell(row,col,board); // both work
        if (newBoard[row][col].num_mine_neighbors > 0) {
          continue;
        }
        stack.push(neighbor);
      }
    }
  }
  return newBoard;
}

function toggleFlagOn(row, col, board) {
  const newBoard = board.slice();
  newBoard[row][col].is_flagged = true;
  return newBoard;
}

function toggleFlagOff(row, col, board) {
  const newBoard = board.slice();
  newBoard[row][col].is_flagged = false;
  return newBoard;
}
