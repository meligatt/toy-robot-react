import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({
  text
}) => {
  return(
    <div className = "alert__text">
      { text }
    </div>
  );
};

Alert.propTypes = {
  text:PropTypes.string
};

export default Alert;