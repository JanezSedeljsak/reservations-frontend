import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE } from "../utils";
import { useDispatch } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card" style={{ width: "90%" }}>
        <h2 className="card-header">Edit profile</h2>
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
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
