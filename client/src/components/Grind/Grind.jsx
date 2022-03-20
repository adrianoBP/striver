import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import './grind.css';

const Grind = ({ grind }) => {
  console.log(grind);
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
          <ProgressBar now={grind.completion} />
        </div>
      </div>
    </div>
  );
};

export default Grind;
