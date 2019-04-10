import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({
  show,
  direction,
  hasObstacle
}) => {
  return(
    <div className = "col" role = "cell">
      { show ?
        <div className = { `tile tile--full tile-full--facing-${direction.toLowerCase()}` } />
        :
        hasObstacle ? <div className = { 'tile tile--obstacle' } /> : <div className = "tile" />
      }
    </div>
  );
};

Tile.propTypes = {
  show:PropTypes.bool,
  direction:PropTypes.string,
  hasObstacle:PropTypes.bool,
};

export default Tile;

