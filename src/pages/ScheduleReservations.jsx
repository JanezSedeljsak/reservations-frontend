import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scheduler } from "@aldabil/react-scheduler";
import { Card, Box, CircularProgress } from "@mui/material";
import { getManagementSchedule } from "../actions/management";
import { formatFromTo, handleCourtTimelineTitle } from "../actions/helpers";
import { getCourtDetail } from "../actions/common";
import { isUserCompany } from "../actions/user";
import { makeReservation } from "../actions/client";

export default function () {
  const { courtId, locationId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.management.loading || state.client.loading
  );
  const timeline = useSelector((state) => state.management.timeline);
  const court = useSelector((state) => state?.common?.courtDetail ?? {});
  const isCompany = useSelector(isUserCompany);

  function fetchScheduleData() {
    dispatch(getManagementSchedule({ court: courtId, location: locationId }));
  }

  useEffect(() => {
    fetchScheduleData();
    dispatch(getCourtDetail(courtId));
  }, []);

  function hanldeMakeReservation(e, scheduleId) {
    e.stopPropagation();
    if (isCompany) {
      return;
    }

    dispatch(
      makeReservation({
        schedule: scheduleId,
        date: "",
      })
    );
  }

  function renderSchedule() {
    if (loading) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Card>
        <Scheduler
          view="week"
          navigation={false}
          disableGoToDay={false}
          editable={false}
          deletable={false}
          week={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 1,
            startHour: 6,
            endHour: 23,
            step: 120,
            navigation: true,
            disableGoToDay: false,
          }}
          events={
            (timeline?.length ?? 0) > 0
              ? timeline?.map((event) => ({
                  title: event.title,
                  event_id: event?.id,
                  start: new Date(event.start_datetime),
                  end: new Date(event.end_datetime),
                }))
              : []
          }
          eventRenderer={(event) => (
            <div
              className="rezervd-event"
              onClick={(e) => hanldeMakeReservation(e, event.event_id)}
            >
              <h6>{event.title}</h6>
              <div>{formatFromTo(event.start, event.end)}</div>
            </div>
          )}
        />
      </Card>
    );
  }

  return (
    <>
      <div className="center" style={{ marginTop: 20 }}>
        <div className="main-container">
          <div className="page-header header-row">
            <div className="page-header">
              <h4 style={{ marginBottom: 0 }}>
                {handleCourtTimelineTitle(court)}
              </h4>
            </div>
          </div>
          <div className="calendar-wrapper">
            {renderSchedule()}
          </div>
        </div>
      </div>
    </>
  );
}
