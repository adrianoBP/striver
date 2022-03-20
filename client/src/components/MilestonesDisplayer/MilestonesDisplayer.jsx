import React from 'react';
import Milestone from '../Milestone/Milestone';

import './milestonesdisplayer.css';

const MilestonesDisplayer = ({ milestones, grindId }) => {
  return (
    <div className="milestone-list">
      {milestones.map((milestone) => (
        <Milestone
          milestone={milestone}
          key={milestone._id}
          grindId={grindId}
        />
      ))}
    </div>
  );
};

export default MilestonesDisplayer;
