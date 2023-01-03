import { useEffect, useRef } from "react";
import { FaCalendar, FaCheckSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCourts, getCourtTypes } from "../actions/common";
import { useDispatch, useSelector } from "react-redux";
import { StyledTableCell, StyledTableRow } from "../components/StyledTable";
import { Select, Input, SubmitButton } from "../components/form";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import IconButton from "../components/IconButton";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.common.loading);
  const courts = useSelector((state) => state.common.locationCourts ?? []);
  const courtTypes = useSelector((state) => state.common.courtTypes);
  console.log(courts);

  const courtTypeRef = useRef(null);
  const searchRef = useRef(null);

  // on screen load -> get court types
  useEffect(() => {
    dispatch(getCourtTypes());
    dispatch(
      getCourts({
        search: searchRef?.current?.value,
        courtType: courtTypeRef?.current?.value,
      })
    );
  }, [courtTypeRef]);

  function openTimeline(court_id) {
    alert("open timeline");
  }

  function filter() {
    dispatch(
      getCourts({
        search: searchRef?.current?.value,
        courtType: courtTypeRef?.current?.value,
      })
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
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell sx={{ width: 100 }} align="center">
                Is outside
              </StyledTableCell>
              <StyledTableCell sx={{ width: 250 }} align="right">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courts.map((court) => (
              <StyledTableRow key={court.id}>
                <StyledTableCell component="th">
                  {court?.location?.name ?? 'No location'}
                </StyledTableCell>
                <StyledTableCell component="th" scope="court">
                  {court.name}
                </StyledTableCell>
                <StyledTableCell sx={{ width: 100 }} align="center">
                  {court?.is_outside ? <FaCheckSquare size={16} /> : null}
                </StyledTableCell>
                <StyledTableCell sx={{ width: 250 }} align="right">
                  <IconButton
                    color="default"
                    tooltip={"Show court timeline"}
                    icon={<FaCalendar size={20} />}
                    onClick={() => openTimeline(court.id)}
                  />
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
          <div style={{ marginBottom: 10 }}>
            <Card>
              <CardContent>
                <h4>Courts</h4>
                <Input reference={searchRef} id={"name"} />
                <Select
                  id={"type"}
                  reference={courtTypeRef}
                  options={[{id: null, name: '/'}, ...courtTypes]}
                />
                <SubmitButton label={"Filter"} onPress={filter} />
              </CardContent>
            </Card>
          </div>
          {RenderDataTable()}
        </div>
      </div>
    </>
  );
}
