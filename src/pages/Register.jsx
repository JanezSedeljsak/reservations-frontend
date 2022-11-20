import React, { useRef, useEffect } from "react";
import AuthWrapper from "../components/AuthWrapper";
import { useNavigate } from "react-router-dom";
import { BASE } from "../utils";
import { useDispatch } from "react-redux";
import { userLogout, userRegister } from "../actions/user";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    dispatch(userLogout());
  }, []);

  function handleRegister() {
    dispatch(userRegister({}));
    navigate(`${BASE}users`);
  }

  return (
    <AuthWrapper>
      <div className="card" style={{ width: "100%" }}>
        <h2 className="card-header">Register</h2>
        <div className="card-body">
          <div>
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              id="name"
              className="form-control"
            />
          </div>
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
            onClick={handleRegister}
          >
            Register
          </button>
        </div>

        <div className="card-footer" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="btn btn-link"
            data-mdb-ripple-color="dark"
            onClick={() => navigate(`${BASE}login`)}
          >
            Already registered?
          </button>
        </div>
      </div>
    </AuthWrapper>
  );
}
