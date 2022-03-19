import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// This library only imports a button with google styling!
import GoogleButton from 'react-google-button';

import AuthContext from '../../components/AuthContext';

import './signin.css';

const SignIn = () => {
  const { login, currentUser } = AuthContext.useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <div className="google-button-container">
      <GoogleButton onClick={login} />
    </div>
  );
};

export default SignIn;
