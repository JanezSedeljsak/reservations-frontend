import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, SubmitButton } from "../../../components/form";
import { Scheduler } from "@aldabil/react-scheduler";

export default function () {
  const loading = useSelector((state) => state.management.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card main-container card-max-height">
        <h4 className="card-header">Timeline</h4>
        <div className="card-body">
          <Scheduler
            view="week"
            events={[
              {
                event_id: 1,
                title: "Event 1",
                start: new Date("2022/12/2 09:30"),
                end: new Date("2022/12/2 15:30"),
              },
              {
                event_id: 2,
                title: "Event 2",
                start: new Date("2022/12/4 10:00"),
                end: new Date("2022/12/4 13:00"),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
