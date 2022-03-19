import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../components/AuthContext';

const SignIn = () => {
  const { login, currentUser } = AuthContext.useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <div>
      <button type="button" onClick={login}>
        Sign in with google
      </button>
    </div>
  );
};

export default SignIn;
