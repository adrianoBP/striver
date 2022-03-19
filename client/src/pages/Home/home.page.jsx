import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';
import withReactQuery from '../../components/common/withReactQuery';

import './home.css';

const HomePage = () => {
  // Subject to change
  const [grinds, setGrinds] = useState([]);

  const { isError, isLoading } = useQuery(
    ['grinds'],
    async () => axios.get('/circles'),
    {
      onSuccess: ({ data }) => {
        setGrinds(data);
      },
    }
  );

  if (isError) {
    return <div className="home-container"> Error </div>;
  }

  if (isLoading) {
    return (
      <div className="home-container">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1> Your Circles </h1>
      {grinds}
    </div>
  );
};

export default withReactQuery(HomePage);
