import * as React from "react";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourtDetail } from "../../actions/common";
import "../../assets/modalstyle.css";
import { handleCourtLocation } from "../../actions/helpers";

export default ({ isVisible, setVisible, courtId }) => {
  const dispatch = useDispatch();
  const court = useSelector((state) => state.common.courtDetail);
  const loading = useSelector((state) => state.common.loading);

  useEffect(() => {
    if (isVisible && courtId) {
      dispatch(getCourtDetail(courtId));
    }
  }, [courtId, isVisible]);

  function renderContent() {
    if (loading) {
      return (
        <Box sx={{ display: "flex", margin: 3 }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {court.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {handleCourtLocation(court)}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Modal
      open={isVisible}
      onClose={() => setVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="detail-modal">{renderContent()}</div>
    </Modal>
  );
};
