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
import { concatCourtTypes, handleCourtLocation } from "../../util/helpers";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default ({ isVisible, setVisible, courtId }) => {
  const dispatch = useDispatch();
  const court = useSelector((state) => state?.common?.courtDetail ?? {});
  const loading = useSelector(state => state.common.detailLoading);

  useEffect(() => {
    if (isVisible && courtId) {
      dispatch(getCourtDetail(courtId));
    }
  }, [courtId, isVisible]);

  function RenderContent() {
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
            {court?.name}
          </Typography>
          <Typography color="text.secondary" component="div">
            Type: {concatCourtTypes(court)}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {handleCourtLocation(court)}
          </Typography>
          <Typography color="text.secondary" component="div">
            Active:{" "}
            {court.is_active ? (
              <AiOutlineCheckCircle size={20} />
            ) : (
              <AiOutlineCloseCircle size={20} />
            )}
          </Typography>
          <Typography color="text.secondary" component="div">
            Is outside:{" "}
            {court.is_outside ? (
              <AiOutlineCheckCircle size={20} />
            ) : (
              <AiOutlineCloseCircle size={20} />
            )}
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
      <div className="detail-modal">{RenderContent()}</div>
    </Modal>
  );
};
