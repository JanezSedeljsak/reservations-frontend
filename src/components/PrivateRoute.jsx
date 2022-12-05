import React from 'react';
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to={'/'} />;
  }

  return children;
}
