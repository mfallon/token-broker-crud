import React from 'react';
import PropTypes from 'prop-types';

const Panel = props => {
  const { title, panelClass, date, children, footer } = props;
  return (
    <div className={`card ${panelClass ? panelClass : 'bg-dark'} mb-4`}>
      <div className='card-header text-white'>
        <div className="title">
          <h3 className="h5 mb-0">{ title }</h3>
        </div>
        { date && <div className="date">
          { date }
        </div> }
      </div>
      <div className='card-body bg-light'>
        { children }
      </div>
      { footer && <div className="card-footer">
        { footer }
      </div> }
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  panelClass: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node
};

export default Panel;
