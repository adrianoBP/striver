import React from 'react';
import { Link } from 'react-router-dom';
import Circle from '../Circle/Circle';

import './circlesdisplayer.css';

const CirclesDisplayer = ({ circles, title, callback }) => {
  return (
    <div className="circles-container">
      <h1 className="padding-left-huge"> {title} </h1>
      <div className="circles-list">
        <button type="button" className="shadow-slim" onClick={callback}>
          New
        </button>

        {circles?.map(({ _id, name, imageSrc }) => (
          <Circle
            name={name}
            imageSrc={imageSrc || 'https://picsum.photos/200'}
            key={_id}
            _id={_id}
          />
        ))}
      </div>
    </div>
  );
};

export default CirclesDisplayer;
