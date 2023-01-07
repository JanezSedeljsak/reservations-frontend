import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scheduler } from "@aldabil/react-scheduler";
import IconButton from "../../../components/IconButton";
import { IoReturnUpBack } from "react-icons/io5";
import { FaPlusCircle, FaBookOpen } from "react-icons/fa";
import { Card } from "@mui/material";
import { getManagementSchedule } from "../../../actions/management";
import {
  formatFromTo,
  handleCourtTimelineTitle,
} from "../../../actions/helpers";
import ScheduleEditModal from "../../../components/modals/ScheduleEditModal";
import { getCourtDetail } from "../../../actions/common";

export default function ({ isMyTimeline, companyId }) {
  const { id: courtId, locationId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.management.loading);
  const timeline = useSelector((state) => state.management.timeline);
  const court = useSelector((state) => state?.common?.courtDetail ?? {});

  const [modalVisible, setModalVisible] = useState(false);
  const [scheduleId, setScheduleId] = useState();

  function goBackToCourts() {
    if (isMyTimeline) {
      navigate(`/location/${locationId}/courts/`);
    } else {
      navigate(`/company/${companyId}/location/${locationId}/courts`);
    }
  }

  function openTimelineReservations(court) {
    navigate(
      `/company/${companyId}/location/${locationId}/court/timeline/${courtId}/reservations`
    );
  }

  function openAddScheduleModal() {
    setScheduleId(null);
    setModalVisible(true);
  }

  function openScheduleEditModal(e, id) {
    e.stopPropagation();
    if (isMyTimeline) {
      setScheduleId(id);
      setModalVisible(true);
    }
  }

  function fetchScheduleData() {
    dispatch(getManagementSchedule({ court: courtId, location: locationId }));
  }

  useEffect(() => {
    fetchScheduleData();
    dispatch(getCourtDetail(courtId));
  }, []);

  return (
    <>
      <div className="center" style={{ marginTop: 20 }}>
        <div className="main-container">
          <div className="page-header header-row">
            <div className="page-header">
              <IconButton
                color="default"
                tooltip={"Go back"}
                icon={<IoReturnUpBack />}
                onClick={goBackToCourts}
              />
              <h4 style={{ marginBottom: 0 }}>
                {handleCourtTimelineTitle(court)}
              </h4>
              {isMyTimeline && (
                <IconButton
                  color="primary"
                  tooltip={"Add new schedule"}
                  icon={<FaPlusCircle />}
                  onClick={openAddScheduleModal}
                />
              )}
              <IconButton
                  color="warning"
                  tooltip={"Show reservations"}
                  icon={<FaBookOpen />}
                  onClick={openTimelineReservations}
                />
            </div>
          </div>
          <div className="calendar-wrapper">
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
                    onClick={(e) => openScheduleEditModal(e, event.event_id)}
                  >
                    <h6>{event.title}</h6>
                    <div>{formatFromTo(event.start, event.end)}</div>
                  </div>
                )}
              />
            </Card>
          </div>
        </div>
      </div>
      <ScheduleEditModal
        isVisible={modalVisible}
        setVisible={setModalVisible}
        locationId={locationId}
        courtId={courtId}
        submitCallback={fetchScheduleData}
        scheduleId={scheduleId}
      />
    </>
  );
}
