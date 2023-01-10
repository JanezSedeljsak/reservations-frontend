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
import { getLocationDetail } from "../../actions/common";
import "../../assets/modalstyle.css";
import { FaPhone, FaMailBulk, FaLink } from "react-icons/fa";

export default ({ isVisible, setVisible, locationId }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.common?.locationDetail ?? {});
  const loading = useSelector(state => state.common.detailLoading);

  useEffect(() => {
    if (isVisible && locationId) {
      dispatch(getLocationDetail(locationId));
    }
  }, [locationId, isVisible]);

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
            {location?.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {location?.city?.name}
          </Typography>
          <Typography variant="body2">
            <FaMailBulk /> {location?.email}
            <br />
            <FaPhone /> {location?.phone_number}
          </Typography>
          <a href={location?.website_url} target={"_blank"}>
            <FaLink /> {location?.website_url}
          </a>
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
