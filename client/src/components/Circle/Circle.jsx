import React from 'react';

import './circle.css';

const Circle = ({ name, description, imageSrc }) => {
  return (
    <div className="content shadow-slim">
      <img src={imageSrc} alt="" />
      <div className="description">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default Circle;
