import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';
import AuthContext from '../../components/AuthContext';

import CirclesDisplayer from '../../components/CirclesDisplayer';

import withReactQuery from '../../components/common/withReactQuery';

import './home.css';

const HomePage = () => {
  const { currentUser } = AuthContext.useAuth();

  const [circles, setCircles] = useState([]);
  const [myCircles, setMyCircles] = useState([]);

  // Circles list are retrieved from the Striver endpoint
  const { isError, isLoading } = useQuery(
    ['circles'],
    async () => {
      return axios.post('/api/strivers/get-create', {
        striverId: currentUser.uid,
        striverName: currentUser.displayName,
      });
    },
    {
      onSuccess: ({ data }) => {
        // Owner field is a string containing the ID of the owner. If it matches
        // current user ID, then that circle was created by current user.
        const ownerCircles = data.circles.filter(({ owner }) => owner);

        setMyCircles(ownerCircles);
        setCircles(data.circles);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const { mutate: creationMutate } = useMutation(
    ['create-circle'],
    async () => {
      return axios.post(
        '/api/circles/add',
        {
          name: 'New Circle',
          description: '13 Strivers',
        },
        {
          headers: {
            'striver-id': currentUser.uid,
          },
        }
      );
    },
    {
      onSuccess: ({ data: newCircleId }) => {
        const newCircle = {
          _id: newCircleId,
          name: 'New Circle',
          description: '13 Strivers',
          owner: true,
          imageSrc: 'https://picsum.photos/200',
        };

        setMyCircles([...myCircles, newCircle]);
      },
    }
  );

  if (isError) {
    return <div className="home-container"> An Error occurred. </div>;
  }

  if (isLoading) {
    return (
      <div className="home-container">
        <Spinner animation="border" />
      </div>
    );
  }

  const handleJoinCircle = () => {};

  const handleCreateCircle = async () => {
    await creationMutate();
  };

  return (
    <>
      <CirclesDisplayer
        circles={circles}
        callback={handleJoinCircle}
        title="Circles you are part of"
      />

      <CirclesDisplayer
        circles={myCircles}
        callback={handleCreateCircle}
        title="Your Circles"
      />
    </>
  );
};

export default withReactQuery(HomePage);
