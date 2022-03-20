import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import withReactQuery from '../common/withReactQuery';

import './milestone.css';
import Activity from '../Activity';

const Milestone = ({ milestone, grindId }) => {
  const completedActivitiesCount = milestone.activities.filter(
    ({ completed }) => completed
  ).length;

  const percentage = Math.round(
    (completedActivitiesCount / milestone.activities.length) * 100
  );

  return (
    <div className="milestone-card shadow-slim">
      <div className="milestone-name">{milestone.name}</div>
      <div className="milestone-progress">
        <div className="count-and-owner">
          <span>{milestone.activities.length} Tasks </span>
        </div>
        <div className="progress-bar-container">
          <ProgressBar now={percentage} />
        </div>
      </div>

      <div className="activities">
        {milestone.activities.map((activity) => (
          <div className="activity">
            <Activity
              activity={activity}
              grindId={grindId}
              milestoneId={milestone._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default withReactQuery(Milestone);
