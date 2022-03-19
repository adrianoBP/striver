import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = AuthContext.useAuth();

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
