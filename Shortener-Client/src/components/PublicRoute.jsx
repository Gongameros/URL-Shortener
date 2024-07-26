import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'


const PublicRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;
