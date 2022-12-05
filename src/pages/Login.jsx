import React, { useRef, useEffect } from "react";
import AuthWrapper from "../components/AuthWrapper";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { userLogin, userLogout } from "../actions/user";
import { Input, SubmitButton } from "../components/form";
import { isProfileLoaded } from "../actions/user";

export default function () {
  const isAuth = useSelector((state) => !!state.user.accessToken);
  const isProfile = useSelector(isProfileLoaded);
  const loading = useSelector(state => state.user?.loading ?? false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    dispatch(userLogout());
  }, []);

  useEffect(() => {
    if (isAuth && isProfile) {
      navigate(`/home`);
    }
  }, [isAuth, isProfile]);

  function handleLogin() {
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(userLogin(user));
  }

  return (
    <AuthWrapper>
      <div className="card" style={{ width: "100%" }}>
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <Input reference={usernameRef} id={"username"} label={"Username"} />
          <Input
            reference={passwordRef}
            id={"password"}
            label={"Password"}
            type={"password"}
          />
          <SubmitButton onPress={handleLogin} label={'Login'} loading={loading} />
        </div>

        <div className="card-footer" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="btn btn-link"
            data-mdb-ripple-color="dark"
            onClick={() => navigate(`/register`)}
          >
            Create new account!
          </button>
        </div>
      </div>
    </AuthWrapper>
  );
}
