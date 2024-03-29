import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import {
  FaCalendar,
  FaPlusCircle,
  FaCheckSquare,
  FaExpandArrowsAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import CourtEditModal from "../../../components/modals/CourtEditModal";
import {
  getCourts,
  getLocationDetail,
} from "../../../actions/common";
import {
  getLocationCourts,
  deleteManagmentCourt,
} from "../../../actions/management";
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
  CircularProgress,
} from "@mui/material";
import IconButton from "../../../components/IconButton";
import {
  useDebounce,
  concatCourtTypes,
  useEffectOnce,
} from "../../../util/helpers";
import CourtDetailModal from "../../../components/modals/CourtDetailModal";

export default function ({ isMyCourts, companyId }) {
  const { id: locationId } = useParams(); // location id
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state_key = isMyCourts ? "management" : "common";
  const isLoading = useSelector((state) => state[state_key].loading);
  const courts = useSelector((state) => state[state_key]?.locationCourts ?? []);
  const location = useSelector((state) => state?.common?.locationDetail ?? {});

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (isMyCourts) {
      dispatch(getLocationCourts({ locationId, search }));
    } else {
      dispatch(getCourts({ location: locationId, search }));
    }
  }, [debouncedSearch]);

  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [courtId, setCourtId] = useState(null);

  function openCourtEditModal(court_id) {
    setCourtId(court_id);
    setModalVisible(true);
  }

  function openCourtDetailModal(court_id) {
    setCourtId(court_id);
    setDetailModalVisible(true);
  }

  function deleteCourt(court_id) {
    if (confirm("Are you sure you want to delete this court?")) {
      dispatch(
        deleteManagmentCourt(court_id, locationId, () => {
          if (isMyCourts) {
            dispatch(getLocationCourts({ locationId, search }));
          } else {
            dispatch(getCourts({ location: locationId, search }));
          }
        })
      );
    }
  }

  function handleTitle() {
    if (!location?.name || !location?.city?.name) {
      return "Courts";
    }

    return `Courts - ${location.name} (${location.city.name})`;
  }

  // on screen load -> get court types
  useEffectOnce(() => {
    dispatch(getLocationDetail(locationId));
    if (isMyCourts) {
      dispatch(getLocationCourts({ locationId }));
    } else {
      dispatch(getCourts({ location: locationId }));
    }
  });

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
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell sx={{ width: 100 }} align="center">
                Is outside
              </StyledTableCell>
              <StyledTableCell sx={{ width: 350 }} align="right">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(courts) &&
              courts.map((court) => (
                <StyledTableRow key={court.id}>
                  <StyledTableCell component="th" scope="court">
                    {court.name}
                  </StyledTableCell>
                  <StyledTableCell>{concatCourtTypes(court)}</StyledTableCell>
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
                      color="info"
                      tooltip={"Court detail"}
                      icon={<FaExpandArrowsAlt size={20} />}
                      onClick={() => openCourtDetailModal(court.id)}
                    />
                    <IconButton
                      color="default"
                      tooltip={"Show court timeline"}
                      icon={<FaCalendar size={20} />}
                      onClick={() => openTimeline(court.id)}
                    />
                    {isMyCourts && (
                      <IconButton
                        color="error"
                        tooltip={"Delete court"}
                        icon={<FaTrashAlt size={20} />}
                        onClick={() => deleteCourt(court.id)}
                      />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  function RenderModals() {
    return (
      <>
        <CourtEditModal
          isVisible={modalVisible}
          setVisible={setModalVisible}
          courtId={courtId}
          locationId={locationId}
          search={search}
        />
        <CourtDetailModal
          isVisible={detailModalVisible}
          setVisible={setDetailModalVisible}
          courtId={courtId}
        />
      </>
    );
  }

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
              <h4 style={{ marginBottom: 0 }}>{handleTitle()}</h4>
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
                onChange={(event) => setSearch(event.target.value)}
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
          {RenderDataTable()}
        </div>
      </div>
      {RenderModals()}
    </>
  );
}
