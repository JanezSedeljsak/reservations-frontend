import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scheduler } from "@aldabil/react-scheduler";
import IconButton from "../../../components/IconButton";
import { FaBackspace } from "react-icons/fa";
import { Card } from "@mui/material";

export default function () {
  const { id: courtId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.management.loading);

  function goBackToCourts() {
    navigate(`/location/courts/${courtId}`);
  }

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="main-container">
        <div className="page-header">
          <div className="page-header">
            <IconButton
              color="default"
              tooltip={"Go back"}
              icon={<FaBackspace />}
              onClick={goBackToCourts}
            />
            <h4 style={{ marginBottom: 0 }}>Timeline</h4>
          </div>
        </div>
        <Card>
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
        </Card>
      </div>
    </div>
  );
}
