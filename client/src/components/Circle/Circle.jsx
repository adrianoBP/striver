import React from 'react';
import { Link } from 'react-router-dom';

import './circle.css';

const Circle = ({ name, description, imageSrc, _id }) => {
  return (
    <Link to={`circles/${_id}`} key={_id} className="content shadow-slim">
      <img src={imageSrc} alt="" />
      <div className="description">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </Link>
  );
};

export default Circle;
