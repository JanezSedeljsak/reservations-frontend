import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoLocation, GoPencil } from "react-icons/go";
import { FaPlusCircle, FaExpandArrowsAlt } from "react-icons/fa";
import { TbSoccerField } from "react-icons/tb";
import LocationEditModal from "../../components/modals/LocationEditModal";
import { useDebounce } from "../../actions/helpers";
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
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import IconButton from "../../components/IconButton";
import { getLocations } from "../../actions/common";
import { getManagementLocations } from "../../actions/management";
import LocationDetailModal from "../../components/modals/LocationDetailModal";

export default function ({ isMyLocations, companyId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeKey = isMyLocations ? "management" : "common";
  const loading = useSelector((state) => state[storeKey].loading);
  const locations = useSelector((state) => state[storeKey]?.locations ?? []);

  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [locationId, setLocationId] = useState(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  function openLocationDetailModal(location_id) {
    setLocationId(location_id);
    setDetailModalVisible(true);
  }

  function openLocationEditModal(location_id) {
    setLocationId(location_id);
    setModalVisible(true);
  }

  useEffect(() => {
    if (!isMyLocations) {
      dispatch(getLocations({ companyId }));
    }
  }, []);

  useEffect(() => {
    if (!isMyLocations) {
      dispatch(getLocations({ companyId, search }));
    } else {
      dispatch(getManagementLocations({ search }));
    }
  }, [debouncedSearch]);

  function openCourts(id) {
    if (isMyLocations) {
      navigate(`/location/${id}/courts/`);
    } else {
      navigate(`/company/${companyId}/location/${id}/courts`);
    }
  }

  const RenderDataTable = () => {
    if (loading) {
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
              <StyledTableCell>City</StyledTableCell>
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
                <StyledTableCell>{location.city?.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {isMyLocations && (
                    <IconButton
                      icon={<GoPencil />}
                      color="primary"
                      tooltip={"Edit location"}
                      onClick={() => openLocationEditModal(location.id)}
                    />
                  )}
                  <IconButton
                    color="info"
                    tooltip={"Location detail"}
                    icon={<FaExpandArrowsAlt size={20} />}
                    onClick={() => openLocationDetailModal(location.id)}
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

  function renderModals() {
    return (
      <>
        <LocationEditModal
          isVisible={modalVisible}
          setVisible={setModalVisible}
          locationId={locationId}
          search={search}
        />
        <LocationDetailModal
          isVisible={detailModalVisible}
          setVisible={setDetailModalVisible}
          locationId={locationId}
        />
      </>
    );
  }

  return (
    <>
      <div className="center" style={{ marginTop: 20 }}>
        <div className="main-container">
          <div className="page-header header-row">
            <div className="page-header">
              <h4 style={{ marginBottom: 0 }}>
                {!isMyLocations ? "Company locations" : "My locations"}
              </h4>
              {isMyLocations && (
                <IconButton
                  color="primary"
                  tooltip={"Add new location"}
                  icon={<FaPlusCircle />}
                  onClick={() => openLocationEditModal(null)}
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
      {renderModals()}
    </>
  );
}
