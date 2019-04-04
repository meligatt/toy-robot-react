import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  value,
  label,
  onClick
}) => {
  return(
    <button
      className = "button"
      value = { value }
      onClick = { (e) => onClick(e) }>
      { label }
    </button>
  );
};

Button.propTypes = {
  value:PropTypes.string,
  label:PropTypes.string,
  onClick:PropTypes.func
};

export default Button;