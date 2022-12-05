import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, SubmitButton } from "../../../components/form";

export default function () {
  const loading = useSelector((state) => state.management.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card main-container card-max-height">
        <h4 className="card-header">Timeline</h4>
        <div>
          ...
        </div>
      </div>
    </div>
  );
}
