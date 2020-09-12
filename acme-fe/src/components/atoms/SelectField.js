import React from 'react';
import PropTypes from 'prop-types';

const SelectField = props => {
  const { id, opts } = props;
  return (
    <select className="form-control" name={ id } { ...props} >
      { opts.map(opt => (
        <option
          value={ opt.value }
          key={ opt.value }>
            { opt.label }
        </option>
      ))}
    </select>
  );
};

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  opts: PropTypes.array.isRequired
};

export default SelectField;
