import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LocationPicker from "react-location-picker";

const defaultPosition = {
  lat: 46.05095064016724,
  lng: 14.468964385986327,
};

import { useDispatch, useSelector } from "react-redux";
import { Input, SubmitButton } from "../form";

export default function ({ isVisible, setVisible, locationId }) {
  const loading = useSelector((state) => state.management.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const urlRef = useRef(null);

  const [position, setPosition] = useState(defaultPosition);

  function handleChangePosition(event) {
    setPosition(event.position);
  }

  function handleLocationUpdate() {
    const location = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone_number: phoneNumberRef.current.value,
      website_url: urlRef.current.value,
    };

    console.log(location, position);
  }

  if (!isVisible) {
    return null;
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
        <Input reference={nameRef} id={"name"} />
        <Input reference={emailRef} type={"email"} id={"email"} />
        <Input reference={urlRef} id={"website_url"} label={"website url"} />
        <Input
          reference={phoneNumberRef}
          id={"phone_number"}
          label={"phone number"}
        />
        <LocationPicker
          containerElement={<div />}
          mapElement={<div style={{ height: 200 }} />}
          defaultPosition={defaultPosition}
          onChange={handleChangePosition}
        />

        <SubmitButton
          onPress={handleLocationUpdate}
          label={"Update location"}
          loading={loading}
        />
      </Box>
    </SwipeableDrawer>
  );
}
