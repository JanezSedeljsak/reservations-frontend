import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserCompany, userLogout } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { BASE } from "../../utils";

export default function () {
  const isAuth = useSelector((state) => !!state.user.accessToken);
  const isCompany = useSelector(isUserCompany);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    // base route logs out user by itself
    navigate(BASE);
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-white">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src={
                "https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              }
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => navigate(`${BASE}companies`)}
              >
                Companies
              </a>
            </li>
            {isCompany ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => navigate(`${BASE}locations`)}
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
            onClick={() => navigate(`${BASE}profile`)}
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
