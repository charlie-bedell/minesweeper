import {createCell} from "./createCell.js";

export function createBoard(width, height, mine_density) {

  const matrix = [];

  for (let row = 0; row < height; row++) {
    const newRow = [];
    for (let col = 0; col < width; col++) {
      newRow.push(createCell(row,col));
    }
    matrix.push(newRow);
  }
  insertBombs(matrix, mine_density);
  numBombNeighbors(matrix);
  return matrix;
}


function insertBombs (matrix, mines) {
  let num_mines = mines;

  while (num_mines > 0) {
    let row = Math.floor(Math.random() * matrix.length);
    let col = Math.floor(Math.random() * matrix[0].length);

    if (!matrix[row][col].has_mine) {
      matrix[row][col].has_mine = true;
      num_mines--;
    }
  }
}

function numBombNeighbors(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].has_mine) {
        const neighbors = getNeighbors(row, col, matrix);
        for (const neighbor of neighbors) {
          const [row_n,col_n] = neighbor;
          matrix[row_n][col_n].num_mine_neighbors++;
        }
      }
    }
  }
}

export function getNeighbors(row, col, matrix) {
  const row_bound = matrix.length;
  const col_bound = matrix[0].length;
  let potentialNeighbors = [
      [row-1,col-1],[row-1,col],[row-1,col+1],
      [row  ,col-1]            ,[row  ,col+1],
      [row+1,col-1],[row+1,col],[row+1,col+1]
  ];
  let neighbors = [];
  for (let i=0; i < potentialNeighbors.length; i++) {
    let neighbor_row = potentialNeighbors[i][0];
    let neighbor_col = potentialNeighbors[i][1];
    
    if ((neighbor_row >= 0 && neighbor_row < row_bound) &&
        (neighbor_col >= 0 && neighbor_col < col_bound)) {
      neighbors.push([potentialNeighbors[i][0],potentialNeighbors[i][1]]);
    }
  }
  return neighbors;
}
