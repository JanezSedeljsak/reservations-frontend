import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

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

  function handleLocationUpdate() {
    const location = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone_number: phoneNumberRef.current.value,
      website_url: urlRef.current.value,
    };

    alert("To še ne dela!");
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
        <Input reference={emailRef} type={'email'} id={"email"} />
        <Input reference={urlRef} id={"website_url"} label={'website url'} />
        <Input reference={phoneNumberRef} id={"phone_number"} label={'phone number'} />

        <SubmitButton
          onPress={handleLocationUpdate}
          label={"Update location"}
          loading={loading}
        />
      </Box>
    </SwipeableDrawer>
  );
}
