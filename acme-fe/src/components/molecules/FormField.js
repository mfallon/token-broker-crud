import React from 'react';
import PropTypes from 'prop-types';

const FormField = props => {
  const { labelText, children } = props;
  return (
    <div className="form-group row">
      <label
        htmlFor={ labelText.toLowerCase() }
        className="col-sm-2 col-form-label"
      >{ labelText }</label>
      <div className="col-sm-10">
        { children }
      </div>
    </div>
  );
};

FormField.propTypes = {
  labelText: PropTypes.string.isRequired
};

export default FormField;
