import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRoute({ children }) {
  const { accessToken } = useSelector((state) => state.auth);
  // console.log('accessToken = ', accessToken);

  if (accessToken) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
  return children;
}

export default AuthRoute;
