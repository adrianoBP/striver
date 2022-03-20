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

        {circles?.map(({ _id, name, description, imageSrc }) => (
          <Link to={`circles/${_id}`} key={_id}>
            <Circle name={name} description={description} imageSrc={imageSrc} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CirclesDisplayer;
