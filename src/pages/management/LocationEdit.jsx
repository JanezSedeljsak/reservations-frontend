import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Input, SubmitButton } from "../../components/form";
import { useParams } from "react-router-dom";

export default function () {
  const { id } = useParams();
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
      //website_url: urlRef.current.value,
    };

    alert("To še ne dela!");
  }

  function navigateToCourts() {
    navigate(`/court/edit/${id}`);
  }

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card" style={{ width: "90%" }}>
        <h4 className="card-header">Edit location</h4>
        <div className="card-body">
          <Input reference={nameRef} id={"name"} label={"Name"} />
          <Input
            reference={phoneNumberRef}
            id={"phone_number"}
            label={"Name"}
          />
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
        <div className="card-footer text-muted">
          <button className="btn btn-info btn-rounded" onClick={navigateToCourts}>View courts</button>
        </div>
      </div>
    </div>
  );
}
