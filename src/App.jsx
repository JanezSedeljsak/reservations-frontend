import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { isUserCompany } from "./actions/user";
import { BASE } from "./utils";

import Navbar from "./components/navs/Navbar";
import PublicNavbar from "./components/navs/PublicNavbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Locations from "./pages/management/Locations";
import LocationEdit from "./pages/management/LocationEdit";
import CourtEdit from "./pages/management/courts/CourtEdit";
import Companies from "./pages/Companies";

const Navigation = ({ isAuth }) => {
  return !isAuth ? <PublicNavbar /> : <Navbar />;
};

function App() {
  const isAuth = useSelector((state) => !!state.user?.accessToken);
  const isCompany = useSelector(isUserCompany);

  return (
    <BrowserRouter basename={BASE}>
      <Navigation isAuth={isAuth} />
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
          path={`/location/edit/:id`}
          element={
            <PrivateRoute isAllowed={isAuth && isCompany}>
              <LocationEdit />
            </PrivateRoute>
          }
        />
        <Route
          path={`/court/edit/:id`}
          element={
            <PrivateRoute isAllowed={isAuth && isCompany}>
              <CourtEdit />
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
    </BrowserRouter>
  );
}

export default App;
