import React from 'react';

import { Card } from 'react-bootstrap';

import './grindcard.css';

const GrindCard = ({ grind }) => {
  return (
    <Card className="big-grind-card">
      <Card.Img variant="top" src="https://picsum.photos/200" />
      <Card.Body>
        <Card.Title style={{ fontWeight: 'bold' }}>{grind.name}</Card.Title>
        <Card.Text>{grind.description || 'No Description'}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GrindCard;
