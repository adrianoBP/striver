import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import Circle from '../../components/Circle';
import withReactQuery from '../../components/common/withReactQuery';

import './circle.page.css';
import GrindDisplayer from '../../components/GrindDisplayer';

const CirclePage = () => {
  const { pathname } = useLocation();

  const [currentCircle, setCurrentCircle] = useState(null);
  const [grinds, setGrinds] = useState([]);

  const circleId = pathname.split('/')[2];

  useEffect(() => {
    if (!circleId) {
      setCurrentCircle(null);
    }
  }, [pathname]);

  // Get current circle data
  const { isError, isLoading } = useQuery(
    ['circle'],
    async () => {
      return axios.get(`/api/circles/${circleId}`);
    },
    {
      onSuccess: ({ data }) => {
        setCurrentCircle(data);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 3,
      retryDelay: 5000,
    }
  );

  const {
    isError: isGrindsError,
    isLoading: isGrindsLoading,
    isSuccess: isGrindSuccess,
  } = useQuery(
    ['grind'],
    async () => {
      return axios.get(`/api/circles/${circleId}/grinds`);
    },
    {
      onSuccess: ({ data }) => {
        setGrinds(data);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 3,
      retryDelay: 5000,
    }
  );

  if (isLoading) {
    return (
      <div className="circle-page-container">
        <Spinner animation="border" />
      </div>
    );
  }

  if (isError || !currentCircle || isGrindsError) {
    return <div className="circle-page-container"> An Error occurred. </div>;
  }

  // Here make API call to /api/circles/ to get strivers IDs
  return (
    <div className="circle-page-container">
      <div>
        <Circle
          name={currentCircle?.name}
          description={`${currentCircle?.striversId.length} Strivers`}
          imageSrc={currentCircle?.imageSrc || 'https://picsum.photos/200'}
        />

        <div className="strivers-list">
          <h3> Strivers </h3>

          {/* Horizontal Line */}
          <hr className="horizontal-line" />

          {currentCircle.striversName?.map((striverName, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${index}_${striverName}`}>
              <p>{striverName}</p>
            </div>
          ))}
        </div>
      </div>

      {isGrindsLoading && <Spinner animation="border" />}
      {isGrindSuccess && <GrindDisplayer grinds={grinds} circleId={circleId} />}
    </div>
  );
};

export default withReactQuery(CirclePage);
