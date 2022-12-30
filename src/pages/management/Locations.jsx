import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoLocation, GoPencil } from "react-icons/go";
import { FaPlusCircle } from "react-icons/fa";
import { TbSoccerField } from "react-icons/tb";
import LocationEditModal from "../../components/modals/LocationEditModal";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import IconButton from "../../components/IconButton";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.management.loading);
  const locations = useSelector((state) => state.management?.locations ?? []);

  const [modalVisible, setModalVisible] = useState(false);
  const [locationId, setLocationId] = useState(null);

  function openLocationEditModal(location_id) {
    setLocationId(location_id);
    setModalVisible(true);
  }

  function openCourts(id) {
    navigate(`/location/${id}/courts/`);
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
            {locations.map((location) => (
              <StyledTableRow key={location.id}>
                <StyledTableCell component="th" scope="location">
                  <GoLocation size={20} />
                  <span style={{ marginLeft: 10 }}>{location.name}</span>
                </StyledTableCell>
                <StyledTableCell>{location.name}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    icon={<GoPencil />}
                    color="primary"
                    tooltip={"Edit location"}
                    onClick={() => openLocationEditModal(location.id)}
                  />
                  <IconButton
                    color="default"
                    icon={<TbSoccerField />}
                    tooltip={"Show courts"}
                    onClick={() => openCourts(location.id)}
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
      <LocationEditModal
        isVisible={modalVisible}
        setVisible={setModalVisible}
        locationId={locationId}
      />
      <div className="center" style={{ marginTop: 20 }}>
        <div className="main-container">
          <div className="page-header header-row">
          <div className="page-header">
              <h4 style={{ marginBottom: 0 }}>My locations</h4>
              <IconButton
                color="primary"
                tooltip={"Add new location"}
                icon={<FaPlusCircle />}
                onClick={() => openLocationEditModal(null)}
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
          {RenderDataTable()}
        </div>
      </div>
    </>
  );
}
