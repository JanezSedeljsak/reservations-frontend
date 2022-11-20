import React, { useRef, useEffect } from "react";
import AuthWrapper from "../components/AuthWrapper";
import { useNavigate } from "react-router-dom";
import { BASE } from "../utils";
import { useDispatch } from "react-redux";
import { userLogin, userLogout } from '../actions/user';

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    dispatch(userLogout());
  }, []);

  function handleLogin() {
    dispatch(userLogin({}));
    navigate(`${BASE}users`);
  }

  return (
    <AuthWrapper>
      <div className="card" style={{ width: "100%" }}>
        <h2 className="card-header">Login</h2>
        <div className="card-body">
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="form-control"
            />
          </div>
          <button
            style={{ marginTop: 20, minWidth: 150 }}
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div className="card-footer" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="btn btn-link"
            data-mdb-ripple-color="dark"
            onClick={() => navigate(`${BASE}register`)}
          >
            Create new account!
          </button>
        </div>
      </div>
    </AuthWrapper>
  );
}
