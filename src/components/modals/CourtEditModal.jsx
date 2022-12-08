import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { SubmitButton, Input } from "../form";

export default function ({ isVisible, setVisible, courtId }) {
  const loading = useSelector((state) => state.user.loading); // change to court loading
  const navigate = useNavigate();

  const nameRef = useRef();
  const typeRef = useRef();

  function handleCourtSubmit() {
    alert("court submit");
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
      <Box
        sx={{ width: 700, m: 2 }}
        role="presentation"
      >
        <h5>Court form</h5>
        <Input reference={nameRef} id={"name"} type={"text"} />
        <Input reference={typeRef} id={"type"} type={"text"} />
        <SubmitButton
          onPress={handleCourtSubmit}
          label={"Update court"}
          loading={loading}
        />
      </Box>
    </SwipeableDrawer>
  );
}