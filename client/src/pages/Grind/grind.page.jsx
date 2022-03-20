import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';

import { useLocation } from 'react-router-dom';
import withReactQuery from '../../components/common/withReactQuery';

import './grind.page.css';
import GrindCard from '../../components/GrindCard';

const GrindPage = () => {
  const { pathname } = useLocation();

  const [currentGrind, setCurrentGrind] = useState(null);
  const [milestones, setMilestones] = useState([]);

  const [, , , , grindId] = pathname.split('/');

  // Get current grind data
  const { isError, isLoading } = useQuery(
    ['grinds'],
    async () => {
      return axios.get(`/api/grinds/${grindId}`);
    },
    {
      onSuccess: ({ data }) => {
        setCurrentGrind(data);
        setMilestones(data.milestones);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 3,
      retryDelay: 5000,
    }
  );

  if (isLoading) {
    return (
      <div className="grind-page-container">
        <Spinner animation="border" />
      </div>
    );
  }

  if (isError) {
    return <div className="grind-page-container"> An Error occurred. </div>;
  }

  return (
    <div className="grind-page-container">
      <GrindCard grind={currentGrind} />
      {/* <ActivitiesDisplayer /> */}
    </div>
  );
};

export default withReactQuery(GrindPage);
