import React from 'react';
import Circle from '../Circle/Circle';

import './circlesdisplayer.css';

const CirclesDisplayer = ({ owner = false, circles, title, callback }) => {
  return (
    <div className="circles-container">
      <h1> {title} </h1>
      <div className="circles-list">
        <button type="button" onClick={callback}>
          +
        </button>

        {circles.map(({ circleId, circleName, description }) => (
          <div key={circleId}>
            <Circle name={circleName} description={description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CirclesDisplayer;
