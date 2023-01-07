import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StyledTableCell, StyledTableRow } from "../components/StyledTable";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  CircularProgress,
  Box,
} from "@mui/material";
import { getReservations } from "../actions/client";
import { cmpDates } from "../actions/helpers";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.client.loading);
  const reservations = useSelector((state) => state.client.reservations ?? []);

  useEffect(() => {
    dispatch(getReservations());
  }, []);

  function handleReservationDate(reservationDate) {
    if (!reservationDate) return "";
    const current = new Date();
    const rDate = new Date(reservationDate);

    if (!cmpDates(current, rDate)) {
      return reservationDate;
    }

    return (
      <span style={{ color: "red", fontWeight: "bold" }}>
        {reservationDate}
      </span>
    );
  }

  const RenderDataTable = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Court</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Day</StyledTableCell>
              <StyledTableCell>Start time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(reservations) &&
              reservations.map((reservation) => (
                <StyledTableRow key={reservation.id}>
                  <StyledTableCell component="th" scope="court">
                    <h6>{reservation?.court?.name}</h6>
                  </StyledTableCell>
                  <StyledTableCell>
                    {handleReservationDate(reservation?.date)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {reservation.schedule?.day_formatted}
                  </StyledTableCell>
                  <StyledTableCell>
                    {reservation.schedule?.start_time.substr(0, 5)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <div className="center" style={{ marginTop: 20 }}>
        <div className="main-container card-max-height">
          <div className="page-header header-row">
            <div className="page-header">
              <h4 style={{ marginBottom: 0 }}>My Reservations</h4>
            </div>
          </div>
          {RenderDataTable()}
        </div>
      </div>
    </>
  );
}
