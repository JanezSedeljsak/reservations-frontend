import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { SubmitButton, Input, Select } from "../form";

export default function ({ isVisible, setVisible, courtId }) {
  const loading = useSelector((state) => state.common.loading > 0);
  const courtTypes = useSelector(state => state.common.courtTypes);

  const nameRef = useRef();
  const typeRef = useRef();

  function handleCourtSubmit() {
    const courtData = {
      name: nameRef.current.value,
      type: typeRef.current.value
    };

    console.log(courtData);
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
        <h5>Court form</h5>
        <Input reference={nameRef} id={"name"} type={"text"} />
        <Select 
          id={'type'}
          reference={typeRef}
          options={courtTypes}
        />
        <SubmitButton
          onPress={handleCourtSubmit}
          label={"Update court"}
          loading={loading}
        />
      </Box>
    </SwipeableDrawer>
  );
}
