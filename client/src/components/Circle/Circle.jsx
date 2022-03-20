import React from 'react';

import './circle.css';

const Circle = ({ name, description }) => {
  return (
    <div className="content">
      <img src="https://picsum.photos/200" alt="" />
      <div className="description">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default Circle;
