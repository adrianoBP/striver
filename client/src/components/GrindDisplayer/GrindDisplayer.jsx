import React from 'react';

import Grind from '../Grind';

import './grinddisplayer.css';

const GrindDisplayer = ({ grinds, circleId }) => {
  return (
    <div className="grinds-list">
      {grinds.map((grind) => (
        <Grind grind={grind} circleId={circleId} key={grind._id} />
      ))}
    </div>
  );
};

export default GrindDisplayer;
