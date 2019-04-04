import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({
  show,
  direction
}) => {
  return(
    <div className = "col">
      { show ?
        <div className = { `tile tile--full tile-full--facing-${direction.toLowerCase()}` } />
        :
        <div className = "tile" />
      }
    </div>
  );
};

Tile.propTypes = {
  show:PropTypes.bool,
  direction:PropTypes.string
};

export default Tile;

