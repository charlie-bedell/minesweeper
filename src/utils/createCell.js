export function createCell(row, col) {
  return {
    row,
    col,
    has_mine: false,
    is_hidden: true,
    is_flagged: false,
    num_mine_neighbors: 0,
    neighbor_ids: [],
  };
}
