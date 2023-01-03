import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { FaCalendar, FaPlusCircle, FaCheckSquare } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import CourtEditModal from "../../../components/modals/CourtEditModal";
import { getCourts, getCourtTypes } from "../../../actions/common";
import { getLocationCourts } from "../../../actions/management";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Box,
  CircularProgress
} from "@mui/material";
import IconButton from "../../../components/IconButton";
import { useDebounce } from "../../../actions/helpers";

export default function ({ isMyCourts, companyId }) {
  const { id: locationId } = useParams(); // location id
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state_key = isMyCourts ? "management" : "common";
  const isLoading = useSelector((state) => state[state_key].loading);
  const courts = useSelector((state) => state[state_key]?.locationCourts ?? []);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    if (isMyCourts) {
      dispatch(getLocationCourts({ locationId, search }));
    } else {
      dispatch(getCourts({ location: locationId, search }));
    }
  }, [debouncedSearch]);

  const [modalVisible, setModalVisible] = useState(false);
  const [courtId, setCourtId] = useState(null);

  function openCourtEditModal(court_id) {
    setCourtId(court_id);
    setModalVisible(true);
  }

  // on screen load -> get court types
  useEffect(() => {
    dispatch(getCourtTypes());
    if (isMyCourts) {
      dispatch(getLocationCourts({locationId}));
    } else {
      dispatch(getCourts({ location: locationId }));
    }
  }, []);

  function openTimeline(court_id) {
    if (isMyCourts) {
      navigate(`/location/${locationId}/court/timeline/${court_id}`);
    } else {
      navigate(
        `/company/${companyId}/location/${locationId}/court/timeline/${court_id}`
      );
    }
  }

  function goBackToLocations() {
    if (isMyCourts) {
      navigate(`/locations`);
    } else {
      navigate(`/company/${companyId}/locations`);
    }
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
                <StyledTableCell component="th" scope="court">
                  {court.name}
                </StyledTableCell>
                <StyledTableCell sx={{ width: 100 }} align="center">
                  {court?.is_outside ? <FaCheckSquare size={16} /> : null}
                </StyledTableCell>
                <StyledTableCell sx={{ width: 250 }} align="right">
                  {isMyCourts && (
                    <IconButton
                      color="primary"
                      tooltip={"Edit court"}
                      icon={<GoPencil size={20} />}
                      onClick={() => openCourtEditModal(court.id)}
                    />
                  )}
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
          <div className="page-header header-row">
            <div className="page-header">
              <IconButton
                color="default"
                tooltip={"Go back"}
                icon={<IoReturnUpBack />}
                onClick={goBackToLocations}
              />
              <h4 style={{ marginBottom: 0 }}>Courts</h4>
              {isMyCourts && (
                <IconButton
                  color="primary"
                  tooltip={"Add new court"}
                  icon={<FaPlusCircle />}
                  onClick={() => openCourtEditModal(null)}
                />
              )}
            </div>
            <div className="input-group rounded" style={{ width: 300 }}>
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={event => setSearch(event.target.value)}
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
          {RenderDataTable()}
        </div>
      </div>
      <CourtEditModal
        isVisible={modalVisible}
        setVisible={setModalVisible}
        courtId={courtId}
      />
    </>
  );
}
