import React from 'react';
import Circle from '../Circle/Circle';

import './circlesdisplayer.css';

const CirclesDisplayer = ({ owner = false, circles, title, callback }) => {
  return (
    <div className="circles-container">
      <h1 className="padding-left-huge"> {title} </h1>
      <div className="circles-list">
        <button type="button" className="shadow-slim" onClick={callback}>
          New
        </button>

        {circles.map(({ circleId, circleName, description, imageSrc }) => (
          <div key={circleId}>
            <Circle
              name={circleName}
              description={description}
              imageSrc={imageSrc}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CirclesDisplayer;
