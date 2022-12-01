import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { Input, SubmitButton } from "../../components/form";

export default function () {
  const loading = useSelector((state) => state.management.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);

  function handleLocationUpdate() {
    const location = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone_number: phoneNumberRef.current.value,
      website_url: urlRef.current.value,
    };

    // dispatch update location
  }

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card" style={{ width: "90%" }}>
        <h2 className="card-header">Edit location TODO!!!</h2>
        <div className="card-body">
          <Input reference={nameRef} id={"name"} label={"Name"} />
          <Input reference={phoneNumberRef} id={"phone_number"} label={"Name"} />
          <Input
            reference={emailRef}
            id={"email"}
            label={"Email"}
            type={"email"}
          />
          <Input reference={nameRef} id={"name"} label={"Name"} />
          <SubmitButton
            onPress={handleLocationUpdate}
            label={"Update location"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
