import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Select = ({
  label,
  name,
  id,
  value,
  options,
  onBlur
}) => {
  return(
    <Fragment>
      <label htmlFor = { id }>{ label }</label>
      <select name = { name } id = { id } value = { value } onBlur = { (e) => { onBlur(e); } }>
        {
          options.length > 0 &&
          options.map((option, index) => <option key = { index } value = { option.value }>{ option.title }</option>)
        }
      </select>
    </Fragment>
  );
};

Select.propTypes = {
  label:PropTypes.string,
  name:PropTypes.string,
  id:PropTypes.string,
  value:PropTypes.number,
  options:PropTypes.array,
  onBlur:PropTypes.func
};

export default Select;