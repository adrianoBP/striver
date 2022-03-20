import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import GoogleButton from 'react-google-button'; // This library only imports a button with google styling!
import { Alert } from 'react-bootstrap';

import AuthContext from '../../components/AuthContext';
import withReactQuery from '../../components/common/withReactQuery';

import './signin.css';

const SignIn = () => {
  const [show, setShow] = useState(false);
  const { login, logout } = AuthContext.useAuth();
  const navigate = useNavigate();

  const { mutate } = useMutation(
    async (user) => {
      return axios.post('/api/strivers/get-create', {
        striveId: user.uid,
        striverName: user.displayName,
      });
    },
    {
      onSuccess: () => {
        navigate('/');
      },
      onError: () => {
        // ! COMMENT THESE LINES FOR DEV
        logout();

        setShow(true);
      },
    }
  );

  const handleLogin = () => login(mutate);

  return (
    <>
      <div className="google-button-container">
        <GoogleButton onClick={handleLogin} />
      </div>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>An error occurred!</Alert.Heading>
          <p> Refresh the page and try again.</p>
        </Alert>
      )}
    </>
  );
};

export default withReactQuery(SignIn);
