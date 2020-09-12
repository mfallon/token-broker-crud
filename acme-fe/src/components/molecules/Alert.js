import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => {
  const { message, showClose } = props;
  return (
    <div id="alert" className="alert alert-success text-center alert-dismissible fade show" role="alert">
      { showClose && <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button> }
      { message }
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired
};

export default Alert;

