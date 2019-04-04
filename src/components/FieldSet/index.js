import React from 'react';
import PropTypes from 'prop-types';

const FieldSet = ({
  legend,
  children
}) => {
  return(
    <fieldset>
      <legend>{ legend }</legend>
      <div className = "fieldset__fields">
        { children }
      </div>
    </fieldset>
  );
};

FieldSet.propTypes = {
  legend:PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FieldSet;