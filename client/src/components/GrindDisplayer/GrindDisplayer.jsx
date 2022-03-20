import React from 'react';
import { Link } from 'react-router-dom';

import Grind from '../Grind';

import './grinddisplayer.css';

const GrindDisplayer = ({ grinds, circleId }) => {
  return (
    <div className="grinds-list">
      {grinds.map((grind) => (
        <Link to={`/circles/${circleId}/grinds/${grind._id}`} key={grind._id}>
          <Grind grind={grind} />
        </Link>
      ))}
    </div>
  );
};

export default GrindDisplayer;
