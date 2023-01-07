import { useEffect, useRef, useState } from "react";
import { FaCalendar, FaCheckSquare, FaExpandArrowsAlt } from "react-icons/fa";
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
import CourtDetailModal from "../components/modals/CourtDetailModal";
import { handleCourtLocation, concatCourtTypes } from "../actions/helpers";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.common.loading);
  const courts = useSelector((state) => state.common.locationCourts ?? []);
  const courtTypes = useSelector((state) => state.common.courtTypes);

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [courtId, setCourtId] = useState(null);

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

  function openTimeline(court) {
    navigate(
      `/company/${court.owner.id}/location/${court.location.id}/court/timeline/${court.id}`
    );
  }

  function handleFilterCourts() {
    dispatch(
      getCourts({
        search: searchRef?.current?.value,
        courtType: courtTypeRef?.current?.value,
      })
    );
  }

  function openCourtDetailModal(court_id) {
    setCourtId(court_id);
    setDetailModalVisible(true);
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
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell sx={{ width: 100 }} align="center">
                Is outside
              </StyledTableCell>
              <StyledTableCell sx={{ width: 250 }} align="right">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(courts) &&
              courts.slice(0, 5).map((court) => (
                <StyledTableRow key={court.id}>
                  <StyledTableCell component="th">
                    {handleCourtLocation(court)}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="court">
                    {court?.name}
                  </StyledTableCell>
                  <StyledTableCell>{concatCourtTypes(court)}</StyledTableCell>
                  <StyledTableCell sx={{ width: 100 }} align="center">
                    {court?.is_outside ? <FaCheckSquare size={16} /> : null}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: 250 }} align="right">
                    <IconButton
                      color="info"
                      tooltip={"Court detail"}
                      icon={<FaExpandArrowsAlt size={20} />}
                      onClick={() => openCourtDetailModal(court.id)}
                    />
                    <IconButton
                      color="default"
                      tooltip={"Show court timeline"}
                      icon={<FaCalendar size={20} />}
                      onClick={() => openTimeline(court)}
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
                <Input
                  reference={searchRef}
                  id={"name_city"}
                  label={"Name or city"}
                />
                <Select
                  id={"type"}
                  reference={courtTypeRef}
                  options={[{ id: "", name: "/" }, ...courtTypes]}
                />
                <SubmitButton label={"filter"} onPress={handleFilterCourts} />
              </CardContent>
            </Card>
          </div>
          {RenderDataTable()}
        </div>
      </div>
      <CourtDetailModal
        isVisible={detailModalVisible}
        setVisible={setDetailModalVisible}
        courtId={courtId}
      />
    </>
  );
}
