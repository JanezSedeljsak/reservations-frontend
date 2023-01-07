import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LocationPicker from "react-location-picker";
import {
  createManagementLocation,
  updateManagementLocation,
} from "../../actions/management";

const defaultPosition = {
  lat: 46.05095064016724,
  lng: 14.468964385986327,
};

import { useDispatch, useSelector } from "react-redux";
import { Input, Select, SubmitButton } from "../form";
import { getLocationDetail } from "../../actions/common";

export default function ({ isVisible, setVisible, locationId, search }) {
  const loading = useSelector(
    (state) => state.management.loading || state.common.loading
  );
  const inProgress = useSelector(
    (state) => state?.management?.actionInProgress ?? false
  );
  const location = useSelector((state) => state?.common?.locationDetail ?? {});
  const cities = useSelector((state) => state?.common?.cities ?? []);

  const isCreate = locationId === null;
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const urlRef = useRef(null);
  const cityRef = useRef(null);

  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    if (!loading && Object.keys(location)?.length) {
      setPosition({ lat: location.latitude, lng: location.longitude });
    }
  }, [location, loading]);

  useEffect(() => {
    if (!isCreate && isVisible) {
      dispatch(getLocationDetail(locationId));
    }
  }, [locationId, isVisible]);

  function handleChangePosition(event) {
    setPosition(event.position);
  }

  function prepareData() {
    const location = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone_number: phoneNumberRef.current.value,
      website_url: urlRef.current.value,
      city: cityRef.current.value,
    };

    return { ...location, latitude: position.lat, longitude: position.lng };
  }

  function handleLocationUpdate(event) {
    event.preventDefault();
    const data = prepareData();
    dispatch(updateManagementLocation({ ...data, id: locationId }, { search }));
    setVisible(false);
  }

  function handleLocationCreate(event) {
    event.preventDefault();
    const data = prepareData();
    dispatch(createManagementLocation(data, { search }));
    setVisible(false);
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
          reference={nameRef}
          id={"name"}
          value={!isCreate ? location?.name : ""}
        />
        <Select
          reference={cityRef}
          id={"city"}
          label={"city"}
          value={!isCreate ? location?.city?.id : cities?.[0]?.id ?? -1}
          options={cities}
        />
        <Input
          reference={emailRef}
          type={"email"}
          id={"email"}
          value={!isCreate ? location?.email : ""}
        />

        <Input
          reference={urlRef}
          id={"website_url"}
          label={"website url"}
          value={!isCreate ? location?.website_url : ""}
        />
        <Input
          reference={phoneNumberRef}
          id={"phone_number"}
          label={"phone number"}
          value={!isCreate ? location?.phone_number : ""}
        />
        <LocationPicker
          containerElement={<div />}
          mapElement={<div style={{ height: 200 }} />}
          defaultPosition={position}
          onChange={handleChangePosition}
        />

        <SubmitButton
          onPress={isCreate ? handleLocationCreate : handleLocationUpdate}
          label={isCreate ? "Create location" : "Update location"}
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
        <h5>Location form</h5>
        {renderForm()}
      </Box>
    </SwipeableDrawer>
  );
}
