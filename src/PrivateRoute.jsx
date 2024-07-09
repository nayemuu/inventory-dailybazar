import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { accessToken } = useSelector((state) => state.auth);

  if (accessToken) {
    return children;
  } else {
    // Use the `replace` prop to replace the current entry in the history
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
