import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './grind.css';

const Grind = ({ grind, circleId }) => {
  return (
    <Link
      to={`/circles/${circleId}/grinds/${grind._id}`}
      className="grind-card shadow-slim"
    >
      <div className="grind-name">{grind.name}</div>

      {/* vertical divider */}

      <div className="grind-details">
        <div className="count-and-owner">
          <span>{grind.milestonesCount} milestones</span>
          {/* <span>{grind.striverId}</span> */}
          <span>{grind.displayName}</span>
        </div>
        <div className="progress-bar-container">
          <ProgressBar now={grind.completion} />
        </div>
      </div>
    </Link>
  );
};

export default Grind;
