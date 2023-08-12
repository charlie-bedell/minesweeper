import '../index.css';

export function Cell(
  {
    row,
    col,
    has_mine,
    is_hidden,
    is_flagged,
    num_mine_neighbors,
    handleClick,
    handleContextMenu,
  }) {

  let val = null;

  if (is_hidden) {
    if (is_flagged) {
      val = '🚩';
    }
  } else {
    if (has_mine) {
      val = '💣';
    } else {
      val = num_mine_neighbors;
    }
  }
  
  
  return (
    <button
      className="square"
      onClick={() => handleClick(row,col)}
      onContextMenu={(e) => {
        e.preventDefault();
        handleContextMenu(row,col);}}>
      {val}
    </button>  
  );
}
