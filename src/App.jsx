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
import Dashboard from "./pages/management/Dashboard";
import Courts from "./pages/Courts";
import CompanyCourts from "./pages/CompanyCourts";
import CompanyLocations from "./pages/CompanyLocations";
import Reservations from "./pages/Reservations";
import CompanyTimeline from "./pages/CompanyTimeline";
import ScheduleReservations from './pages/ScheduleReservations';

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
              {isCompany ? <Locations isMyLocations={true} /> : <Reservations />}
            </PrivateRoute>
          }
        />
        <Route
          path={`/locations`}
          element={
            <PrivateRoute isAllowed={isAuth && isCompany}>
              <Locations isMyLocations={true} />
            </PrivateRoute>
          }
        />
        <Route
          path={`/courts`}
          element={
            <PrivateRoute isAllowed={isAuth && !isCompany}>
              <Courts />
            </PrivateRoute>
          }
        />
        <Route
          path={`/reservations`}
          element={
            <PrivateRoute isAllowed={isAuth && !isCompany}>
              <Reservations />
            </PrivateRoute>
          }
        />
        <Route
          path={`/company/:companyId/locations`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              <CompanyLocations />
            </PrivateRoute>
          }
        />
        <Route
          path={`/company/:companyId/location/:id/courts`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              <CompanyCourts />
            </PrivateRoute>
          }
        />
        <Route
          path={`/company/:companyId/location/:locationId/court/timeline/:id`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              <CompanyTimeline />
            </PrivateRoute>
          }
        />
        <Route
          path={`/company/:companyId/location/:locationId/court/timeline/:courtId/reservations`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              <ScheduleReservations />
            </PrivateRoute>
          }
        />
        <Route
          path={`/dashboard`}
          element={
            <PrivateRoute isAllowed={isAuth && isCompany}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={`/location/:id/courts/`}
          element={
            <PrivateRoute isAllowed={isAuth && isCompany}>
              <LocationCourts isMyCourts={true} />
            </PrivateRoute>
          }
        />
        <Route
          path={`location/:locationId/court/timeline/:id`}
          element={
            <PrivateRoute isAllowed={isAuth}>
              <CourtTimeline isMyTimeline={true} />
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
