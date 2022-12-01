import React from 'react';
import { Navigate } from "react-router-dom";
import { BASE } from '../utils';

export default function PrivateRoute({ isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to={BASE} />;
  }

  return children;
}
