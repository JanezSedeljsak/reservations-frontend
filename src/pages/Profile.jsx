import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { Input, SubmitButton } from "../components/form";

export default function () {
  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const oldUsernameRef = useRef(null);
  const oldPasswordRef = useRef(null);

  function handleProfileUpdate() {
    const user = {
      first_name: fNameRef.current.value,
      last_name: lNameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,

      prev_username: oldUsernameRef.current.value,
      prev_password: oldPasswordRef.current.value,
    };
    
    // dispatch update profile
  }

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card" style={{ width: "90%" }}>
        <h2 className="card-header">Edit profile TODO!!!</h2>
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

          <div style={{ height: 50 }}></div>

          <Input
            reference={oldUsernameRef}
            id={"old_username"}
            label={"Username"}
          />
          <Input
            reference={oldPasswordRef}
            id={"old_password"}
            label={"Password"}
            type={"password"}
          />

          <SubmitButton
            onPress={handleProfileUpdate}
            label={"Update profile"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
