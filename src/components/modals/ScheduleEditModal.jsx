import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  createManagementSchedule,
  updateManagementSchedule,
  getManagementScheduleDetail,
} from "../../actions/management";
import { DAY_OF_WEEK_OPTIONS, toDayjs } from "../../actions/helpers";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import { Input, Select, SubmitButton } from "../form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

export default function ({
  isVisible,
  setVisible,
  locationId,
  courtId,
  scheduleId,
}) {
  const loading = useSelector((state) => state.management.loading);
  const inProgress = useSelector(
    (state) => state?.management?.actionInProgress ?? false
  );

  const schedule = useSelector(
    (state) => state?.management?.scheduleDetail ?? {}
  );
  const isCreate = scheduleId === null;
  const dispatch = useDispatch();
  console.log(schedule);

  const titleRef = useRef(null);
  const dayRef = useRef(null);
  const [start, setStart] = useState(dayjs(new Date()));
  const [end, setEnd] = useState(dayjs(new Date()));

  useEffect(() => {
    if (Object.keys(schedule ?? {}).length) {
      setStart(toDayjs(schedule.start_time));
      setEnd(toDayjs(schedule.end_time));
    }
  }, [schedule]);

  useEffect(() => {
    if (!isCreate && isVisible) {
      dispatch(
        getManagementScheduleDetail({
          locationId,
          courtId,
          id: scheduleId,
        })
      );
    }
  }, [scheduleId, isVisible]);

  function prepareData() {
    return {
      locationId,
      courtId,
      title: titleRef.current.value,
      id: scheduleId,
      day: dayRef.current.value,
      start_time: start.$d.toTimeString().slice(0, 8),
      end_time: end.$d.toTimeString().slice(0, 8),
    };
  }

  function handleScheduleUpdate(event) {
    event.preventDefault();
    const data = prepareData();
    setVisible(false);
    dispatch(updateManagementSchedule(data));
  }

  function handleScheduleCreate(event) {
    event.preventDefault();
    const data = prepareData();
    setVisible(false);
    dispatch(createManagementSchedule(data));
  }

  if (!isVisible) {
    return null;
  }

  function renderForm() {
    if (loading) {
      return <CircularProgress />;
    }

    return (
      <>
        <Input
          reference={titleRef}
          id={"title"}
          value={!isCreate ? schedule?.title ?? '' : ''}
        />
        <Select
          reference={dayRef}
          id={"day"}
          label={"day"}
          value={!isCreate ? schedule?.day : "1"}
          options={DAY_OF_WEEK_OPTIONS}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="time-input" style={{ width: "100%", marginTop: 15 }}>
            <TimePicker
              label="Start time"
              value={start}
              onChange={setStart}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className="time-input" style={{ width: "100%", marginTop: 15 }}>
            <TimePicker
              label="End time"
              value={end}
              onChange={setEnd}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
        <SubmitButton
          onPress={!isCreate ? handleScheduleUpdate : handleScheduleCreate}
          label={isCreate ? "Create schedule" : "Update schedule"}
          loading={inProgress}
        />
      </>
    );
  }

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={isVisible}
      onClose={() => setVisible(false)}
      onOpen={() => setVisible(true)}
      disableSwipeToOpen={true}
    >
      <Box sx={{ width: 700, m: 2 }} role="presentation">
        <h5>Schedule form</h5>
        {renderForm()}
      </Box>
    </SwipeableDrawer>
  );
}
