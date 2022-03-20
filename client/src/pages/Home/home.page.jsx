import React, { useState } from 'react';
// import axios from 'axios';
// import { useQuery } from 'react-query';
// import { Spinner } from 'react-bootstrap';
import AuthContext from '../../components/AuthContext';

import Circle from '../../components/Circle';

import withReactQuery from '../../components/common/withReactQuery';

import './home.css';

const HomePage = () => {
  const { currentUser } = AuthContext.useAuth();

  // Subject to change
  const [circles, setCircles] = useState([
    {
      circleId: 2,
      owner: 'googleId',
      circleName: 'My Friends Amazing Circle',
      description: '13 Strivers',
    },
    {
      circleId: 3,
      owner: 'googleId',
      circleName: 'My Friends Amazing Circle',
      description: '13 Strivers',
    },
    {
      circleId: 4,
      owner: 'googleId',
      circleName: 'My Friends Amazing Circle',
      description: '13 Strivers',
    },
    {
      circleId: 5,
      owner: 'googleId',
      circleName: 'My Friends Amazing Circle',
      description: '13 Strivers',
    },
  ]);

  const [myCircles, setMyCircles] = useState([
    {
      circleId: 1,
      owner: 'googleId',
      circleName: 'My Amazing Circle',
      description: '13 Strivers',
    },
  ]);

  // const { isError, isLoading } = useQuery(
  //   ['circles'],
  //   async () => axios.get('/circles'),
  //   {
  //     onSuccess: ({ data }) => {
  //       const ownerCircles = data.filter(({ owner }) => owner);

  //       setMyCircles(ownerCircles);
  //       setCircles(data);
  //     },
  //   }
  // );

  // if (isError) {
  //   return <div className="home-container"> An Error occurred. </div>;
  // }

  // if (isLoading) {
  //   return (
  //     <div className="home-container">
  //       <Spinner animation="border" />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="circles-container">
        <h1> Circles you are part of </h1>
        <div className="circles-list">
          {circles.map(({ circleId, circleName, description }) => (
            <div key={circleId}>
              <Circle name={circleName} description={description} />
            </div>
          ))}
        </div>
      </div>
      <div className="circles-container">
        <h1> Your Circles </h1>
        <div className="circles-list">
          {myCircles.map(({ circleId, circleName, description }) => (
            <div key={circleId}>
              <Circle name={circleName} description={description} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withReactQuery(HomePage);
