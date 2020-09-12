import React from 'react';
import PropTypes from 'prop-types';

const TextField = props => {
  const { id } = props;
  return (
    <>
      <input type="text" className="form-control" name={ id } { ...props } />
      <div className="invalid-feedback">{`You must provide a value for ${id}`}</div>
      <div className="valid-feedback">Looks good!</div>
    </>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired
};

export default TextField;

