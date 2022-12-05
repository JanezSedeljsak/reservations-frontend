import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserCompany } from "../../actions/user";
import { useNavigate } from "react-router-dom";

import Logo from '../../assets/LogoHorizontal.svg';

export default function () {
  const isCompany = useSelector(isUserCompany);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-white">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src={Logo}
              height={35}
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => navigate(`/companies`)}
              >
                Companies
              </a>
            </li>
            {isCompany ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => navigate(`/locations`)}
                >
                  My locations
                </a>
              </li>
            ) : null}
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
