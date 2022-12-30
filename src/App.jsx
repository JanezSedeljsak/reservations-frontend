import { useSelector } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { isUserCompany, isProfileLoaded } from "./actions/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navs/Navbar";
import PublicNavbar from "./components/navs/PublicNavbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Locations from "./pages/management/Locations";
import CourtTimeline from "./pages/management/courts/CourtTimeline";
import Companies from "./pages/Companies";
import LocationCourts from "./pages/management/courts/LocationCourts";

const Navigation = ({ isAuth, isPofile }) => {
  return !(isAuth && isPofile) ? <PublicNavbar /> : <Navbar />;
};

function App() {
  const isAuth = useSelector((state) => !!state.user.accessToken);
  const isPofile = useSelector(isProfileLoaded);
  const isCompany = useSelector(isUserCompany);

  return (
    <HashRouter>
      <ToastContainer autoClose={2000} />
      <Navigation isAuth={isAuth} isPofile={isPofile} />
      <Routes>
        <Route path={`/login`} element={<Login />} />
        <Route path={`/register`} element={<Register />} />
        <Route
          path={`/home`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              {isCompany ? <Locations /> : <Profile />}
            </PrivateRoute>
          }
        />
        <Route
          path={`/locations`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              {isCompany ? <Locations /> : <Navigate replace to={`login`} />}
            </PrivateRoute>
          }
        />
        <Route
          path={`/location/:id/courts/`}
          element={
            <PrivateRoute isAllowed={isAuth && isCompany}>
              <LocationCourts />
            </PrivateRoute>
          }
        />
        <Route
          path={`location/:locationId/court/timeline/:id`}
          element={
            <PrivateRoute isAllowed={isAuth && isCompany}>
              <CourtTimeline />
            </PrivateRoute>
          }
        />
        <Route
          path={`/profile`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={`/companies`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              <Companies />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate replace to={`/login`} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
