import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BASE } from "./utils";

import Navbar from "./components/navs/Navbar";
import PublicNavbar from "./components/navs/PublicNavbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

const Navigation = ({ isAuth }) => {
  return !isAuth ? <PublicNavbar /> : <Navbar />;
};

function App() {
  const isAuth = useSelector((state) => !!state.user.jwt);

  return (
    <BrowserRouter>
      <Navigation isAuth={isAuth} />
      <Routes>
        <Route path={BASE} element={<Navigate replace to={`${BASE}login`} />} />
        <Route path={`${BASE}login`} element={<Login />} />
        <Route path={`${BASE}register`} element={<Register />} />
        <Route
          path={`${BASE}users`}
          element={
            <PrivateRoute isAuth={isAuth}>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path={`${BASE}profile`}
          element={
            <PrivateRoute isAuth={isAuth}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
