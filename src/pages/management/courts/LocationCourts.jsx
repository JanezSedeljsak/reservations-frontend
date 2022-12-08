import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { FaCalendar, FaBackspace, FaPlusCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import CourtEditModal from "../../../components/modals/CourtEditModal";
import { getCourtTypes, getLocationCourts } from "../../../actions/common";
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
} from "@mui/material";
import IconButton from "../../../components/IconButton";

export default function () {
  const { id: locationId } = useParams(); // location id
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.common.loading > 0);
  const courts = useSelector((state) => state.common.locationCourts ?? []);

  const [modalVisible, setModalVisible] = useState(false);
  const [courtId, setCourtId] = useState(null);

  function openCourtEditModal(court_id) {
    setCourtId(court_id);
    setModalVisible(true);
  }

  // on screen load -> get court types
  useEffect(() => {
    dispatch(getCourtTypes());
    dispatch(getLocationCourts(locationId));
  }, []);

  function openTimeline(court_id) {
    navigate(`/court/timeline/${court_id}`);
  }

  function goBackToLocations() {
    navigate(`/locations`);
  }

  const RenderDataTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { name: "neki", id: 2 },
              { name: "Igrisce", id: 1 },
            ].map((court) => (
              <StyledTableRow key={court.id}>
                <StyledTableCell component="th" scope="court">
                  {court.name}
                </StyledTableCell>
                <StyledTableCell>{court.name}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    color="primary"
                    tooltip={"Edit court"}
                    icon={<GoPencil size={20} />}
                    onClick={() => openCourtEditModal(court.id)}
                  />
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
          <div className="page-header">
            <div className="page-header">
              <IconButton
                color="default"
                tooltip={"Go back"}
                icon={<FaBackspace />}
                onClick={goBackToLocations}
              />
              <h4 style={{ marginBottom: 0 }}>Courts</h4>
              <IconButton
                color="primary"
                tooltip={"Add new court"}
                icon={<FaPlusCircle />}
                onClick={() => openCourtEditModal(null)}
              />
            </div>
            <div className="input-group rounded" style={{ width: 300 }}>
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
          {isLoading ? "Loading..." : RenderDataTable()}
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