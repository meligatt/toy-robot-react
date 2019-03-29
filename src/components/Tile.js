import React from 'react';

const Tile = ({
  id,
  show,
  x,
  y,
  direction
}) => {
  return(
    <div id = { id } className = "col" style = { {border:'1px solid red'} }>
      { show ? <span>robot</span> : <span>no robot</span>}
    </div>
  );
};
export default Tile;
