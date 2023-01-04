import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserCompany } from "../../actions/user";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/LogoHorizontal.svg";

export default function () {
  const isCompany = useSelector(isUserCompany);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    navigate("/");
  }

  function CompanyNavItem({ name, route }) {
    if (!isCompany) return null;

    return (
      <li className="nav-item">
        <a className="nav-link" onClick={() => navigate(route)}>
          {name}
        </a>
      </li>
    );
  }

  function ClientNavItem({ name, route }) {
    if (isCompany) return null;

    return (
      <li className="nav-item">
        <a className="nav-link" onClick={() => navigate(route)}>
          {name}
        </a>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-white">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <img src={Logo} height={35} alt="MDB Logo" loading="lazy" />
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate(`/companies`)}>
                Companies
              </a>
            </li>

            <CompanyNavItem name={"My locations"} route={`/locations`} />
            <CompanyNavItem name={"Dashboard"} route={`/dashboard`} />

            <ClientNavItem name={"My reservations"} route={`/reservations`} />
            <ClientNavItem name={"Court Search"} route={`/courts`} />

          </ul>
        </div>

        <div className="d-flex">
          <a
            className="nav-link"
            style={{ paddingRight: 20 }}
            onClick={() => navigate(`/profile`)}
          >
            Profile
          </a>
          <a className="nav-link" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
