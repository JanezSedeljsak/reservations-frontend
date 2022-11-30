import React, { useRef, useEffect } from "react";
import AuthWrapper from "../components/AuthWrapper";
import { useNavigate } from "react-router-dom";
import { BASE } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { userLogout, userRegister } from "../actions/user";
import { Input, SubmitButton } from "../components/form";

export default function () {
  const isAuth = useSelector((state) => !!state.user.accessToken);
  const loading = useSelector((state) => state.user?.loading ?? false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    dispatch(userLogout());
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate(`${BASE}home`);
    }
  }, [isAuth]);

  function handleRegister() {
    const user = {
      first_name: fNameRef.current.value,
      last_name: lNameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(userRegister(user));
  }

  return (
    <AuthWrapper>
      <div className="card" style={{ width: "100%" }}>
        <h2 className="card-header">Register</h2>
        <div className="card-body">
          <Input
            reference={fNameRef}
            id={"first_name"}
            type={"text"}
            label={"First name"}
          />
          <Input
            reference={lNameRef}
            id={"last_name"}
            type={"text"}
            label={"Last name"}
          />
          <Input reference={usernameRef} id={"username"} label={"Username"} />
          <Input reference={emailRef} id={"email"} label={"Email"} />
          <Input
            reference={passwordRef}
            id={"password"}
            label={"Password"}
            type={"password"}
          />

          <SubmitButton
            onPress={handleRegister}
            label={"Register"}
            loading={loading}
          />
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
