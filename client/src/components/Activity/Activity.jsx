import React, { useRef } from 'react';

import axios from 'axios';
import { useMutation } from 'react-query';

const Activity = ({ activity, grindId, milestoneId }) => {
  const activityCheckboxRef = useRef();

  const { mutate } = useMutation(
    async (completed) => {
      return axios.put(
        `/api/grinds/${grindId}/milestones/${milestoneId}/activities/edit`,
        {
          _id: activity._id,
          completed,
        }
      );
    },
    {
      onSuccess: () => {
        console.log('Success');
      },
    }
  );

  const handleCheck = async (checked) => {
    activityCheckboxRef.current.select();

    mutate(checked);
  };
  return (
    <>
      <p>{activity.name}</p>
      <input
        ref={activityCheckboxRef}
        type="checkbox"
        defaultChecked={activity.completed}
        // checked={activity.completed}
        value={activity.completed}
        onClick={({ target }) => handleCheck(target.checked)}
      />
    </>
  );
};

export default Activity;
