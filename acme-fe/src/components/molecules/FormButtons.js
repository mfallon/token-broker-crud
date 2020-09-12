import React from 'react';
import PropTypes from 'prop-types';

const FormButtons = props => {
  const { cancel, submit } = props;
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={ cancel.onClick }
          >
            { cancel.label }
          </button>
        </div>
        <div className="col d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            { ...submit }
          >
            { submit.label }
          </button>
        </div>
      </div>
    </div>
  );
};

FormButtons.propTypes = {
  cancel: PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired,
  submit: PropTypes.shape({
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    }).isRequired
};

export default FormButtons;
