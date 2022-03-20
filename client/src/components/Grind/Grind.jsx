import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import './grind.css';

const Grind = ({ grind }) => {
  return (
    <div className="grind-card shadow-slim">
      <div className="grind-name">{grind.name}</div>

      {/* vertical divider */}

      <div className="grind-details">
        <div className="count-and-owner">
          <span>{grind.milestonesCount}</span>
          {/* <span>{grind.striverId}</span> */}
          <span>Frank</span>
        </div>
        <div className="progress-bar-container">
          <ProgressBar now={60} />
        </div>
      </div>
    </div>
  );
};

export default Grind;
