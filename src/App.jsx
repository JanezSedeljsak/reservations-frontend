import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BASE } from "./utils";

import Navbar from "./components/navs/Navbar";
import PublicNavbar from "./components/navs/PublicNavbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Locations from "./pages/management/Locations";

const Navigation = ({ isAuth }) => {
  return !isAuth ? <PublicNavbar /> : <Navbar />;
};

function App() {
  const isAuth = useSelector((state) => !!state.user?.accessToken);
  const isManagement = useSelector((state) => !!state.user?.isManagement);

  return (
    <BrowserRouter>
      <Navigation isAuth={isAuth} />
      <Routes>
        <Route path={`${BASE}login`} element={<Login />} />
        <Route path={`${BASE}register`} element={<Register />} />
        <Route
          path={`${BASE}home`}
          element={
            <PrivateRoute isAuth={isAuth}>
              {isManagement ? <Locations /> : <Profile />}
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
        <Route path="*" element={<Navigate replace to={`${BASE}login`} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
