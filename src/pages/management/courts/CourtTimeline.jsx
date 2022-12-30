import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scheduler } from "@aldabil/react-scheduler";
import IconButton from "../../../components/IconButton";
import { FaBackspace } from "react-icons/fa";
import { Card } from "@mui/material";
import { getManagementSchedule } from '../../../actions/management';
import { id } from "date-fns/locale";

export default function () {
  const { id: courtId, locationId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.management.loading);
  const timeline = useSelector(state => state.management.timeline);
  console.log(timeline);

  function goBackToCourts() {
    navigate(`/location/courts/${courtId}`);
  }

  useEffect(() => {
    dispatch(getManagementSchedule({ court: courtId, location: locationId }));
  }, []);

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="main-container">
        <div className="page-header header-row">
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
            navigation={true}
            disableGoToDay={true}
            events={timeline.map(event => ({
              title: event.day_formatted,
              event_id: id,
              start: new Date(event.start_datetime),
              end: new Date(event.end_datetime),
            }))}
          />
        </Card>
      </div>
    </div>
  );
}
