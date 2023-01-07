import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scheduler } from "@aldabil/react-scheduler";
import { Card, Box, CircularProgress } from "@mui/material";
import { getManagementSchedule } from "../actions/management";
import {
  cmpDates,
  formatFromTo,
  handleCourtTimelineTitle,
} from "../actions/helpers";
import { getCourtDetail } from "../actions/common";
import { isUserCompany } from "../actions/user";
import { makeReservation, cancelReservation } from "../actions/client";
import IconButton from "../components/IconButton";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import {
  getWeekString,
  getDateWithOffset,
  getNearestPastMonday,
  dateStr,
  addTimeToDate,
} from "../actions/helpers";
import * as toast from "../actions/toast";

export default function () {
  const { courtId, locationId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.management.loading || state.client.loading
  );
  const timeline = useSelector((state) => state.management.timeline);
  const court = useSelector((state) => state?.common?.courtDetail ?? {});
  const isCompany = useSelector(isUserCompany);
  const idUser = useSelector((state) => state.user?.profile?.id ?? -1);
  const [scheduleDate, setScheduleDate] = useState(new Date());

  function fetchScheduleData(filters) {
    dispatch(
      getManagementSchedule({
        court: courtId,
        location: locationId,
        ...filters,
      })
    );
  }

  useEffect(() => {
    fetchScheduleData({});
    dispatch(getCourtDetail(courtId));
  }, []);

  function handleCardClickEvent(e, picked) {
    e.stopPropagation();
    const isReserved = picked?.reservation_taken !== null;
    if (isCompany && !isReserved) {
      return;
    }

    const isOld = cmpDates(new Date(), new Date(picked.start_datetime));
    if (isOld && !isReserved) {
      toast.warning("This event is already finished!");
      return;
    }

    if (isReserved && picked?.reservation_taken?.user?.id === idUser) {
      const msg = "This is your event. Do you want to cancel your reservation?";
      if (confirm(msg)) {
        dispatch(
          cancelReservation(picked?.reservation_taken?.id, () => {
            const dateFilter = dateStr(scheduleDate);
            fetchScheduleData({
              date: dateFilter,
            });
          })
        );
      }
      return;
    }

    if (isReserved) {
      toast.warning(
        `This event is already reserved by ${picked?.reservation_taken?.user?.username}!`
      );
      return;
    }

    const thisMonday = getNearestPastMonday(scheduleDate);
    const eventDate = getDateWithOffset(thisMonday, parseInt(picked.day) - 1);
    const formatedDate = dateStr(eventDate);

    if (confirm("Are you sure you want to make this reservation?")) {
      dispatch(
        makeReservation(
          {
            schedule: picked.id,
            date: formatedDate,
          },
          () => {
            const dateFilter = dateStr(scheduleDate);
            fetchScheduleData({
              date: dateFilter,
            });
          }
        )
      );
    }
  }

  function handlePreviousWeek() {
    const newDate = getDateWithOffset(scheduleDate, -7);
    setScheduleDate(newDate);
    fetchScheduleData({ date: dateStr(newDate) });
  }

  function handleNextWeek() {
    const newDate = getDateWithOffset(scheduleDate, 7);
    setScheduleDate(newDate);
    fetchScheduleData({ date: dateStr(newDate) });
  }

  function handleDateOffset(dayOffset, time) {
    const thisMonday = getNearestPastMonday(new Date());
    const eventDate = getDateWithOffset(thisMonday, parseInt(dayOffset) - 1);
    const dateWithTime = addTimeToDate(eventDate, time);
    return dateWithTime;
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
                  start: handleDateOffset(event.day, event.start_time),
                  end: handleDateOffset(event.day, event.end_time),
                  ...event,
                }))
              : []
          }
          eventRenderer={(event) => {
            const styleObject = {};
            if (event?.reservation_taken !== null) {
              styleObject["backgroundColor"] = "#ff5f1f";
            }

            const isOld = cmpDates(new Date(), new Date(event.start_datetime));
            if (isOld && event?.reservation_taken === null) {
              styleObject["backgroundColor"] = "#556";
            }

            return (
              <div
                style={styleObject}
                className="rezervd-event"
                onClick={(e) => handleCardClickEvent(e, event)}
              >
                <h6>{event.title}</h6>
                <div>{formatFromTo(event.start, event.end)}</div>
              </div>
            );
          }}
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
            <div>
              <IconButton
                color="info"
                tooltip="Previous week"
                icon={<MdOutlineSkipPrevious size={25} />}
                onClick={handlePreviousWeek}
              />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                {getWeekString(scheduleDate)}
              </span>
              <IconButton
                color="info"
                tooltip="Next week"
                icon={<MdOutlineSkipNext size={25} />}
                onClick={handleNextWeek}
              />
            </div>
          </div>
          <div className="calendar-wrapper">{renderSchedule()}</div>
        </div>
      </div>
    </>
  );
}
