import React from 'react';
import { Navigate } from "react-router-dom";
import { BASE } from '../utils';

export default function PrivateRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to={BASE} />;
  }

  return children;
}
