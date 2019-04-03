import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({
  show,
  direction
}) => {
  return(
    <div className = "col" style = { {border:'1px solid red'} }>
      { show ? <div>robot facing {direction} </div> : <div>no robot</div>}
    </div>
  );
};

Tile.propTypes = {
  show:PropTypes.bool,
  direction:PropTypes.string
};

export default Tile;

