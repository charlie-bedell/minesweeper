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

  function cellValueColor(is_hidden, has_mine, num_mine_neighbors) {

    const COLORS = {
      0: '#aaaaaa',
      1: '#33c4ff',
      2: '#34e12e',
      3: '#d0a728',
      4: '#f1420a',
      5: '#9b2c56',
      6: '#1a1181',
      7: '#c401bb',
      8: '#000000',
    };
    
    if (!is_hidden) {
      if (has_mine) {
        return {background: "red"};
      } else {
        return {color: COLORS[num_mine_neighbors]};
      }
    }
  }
  
  return (
    <button
      className="square"
      onClick={() => handleClick(row,col)}
      onContextMenu={(e) => {
        e.preventDefault();
        handleContextMenu(row,col);}}
      style={cellValueColor(is_hidden, has_mine, num_mine_neighbors)}>
      {val}
    </button>  
  );
}
