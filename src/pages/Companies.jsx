import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserIcon from "../assets/usericon.png";
import { getCompanies } from "../actions/common";
import { useDebounce } from "../util/helpers";
import { Box, CircularProgress } from "@mui/material";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.common.loading);
  const companies = useSelector((state) => state.common?.companies ?? []);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(getCompanies({ search }));
  }, [debouncedSearch]);

  const getAvatar = (company) => {
    return company?.avatar ?? UserIcon;
  };

  function openCompanyLocations(companyId) {
    navigate(`/company/${companyId}/locations`);
  }

  const RenderCompany = (company) => (
    <div className="card" key={company.id}>
      <div className="card-header" style={{ alignItems: "center" }}>
        <img src={getAvatar(company)} width={30} height={30} />
        <span style={{ marginLeft: 10 }}>{company.full_name}</span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{company.email}</h5>
        <p className="card-text">{company.bio}</p>
      </div>
      <div className="card-footer text-muted">
        <button
          className="btn btn-primary btn-rounded"
          onClick={() => openCompanyLocations(company.id)}
        >
          Check locations
        </button>
      </div>
    </div>
  );

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="main-container card-max-height">
        <h4
          className="card-header"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <span>Companies</span>
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
        </h4>
        <div style={{ marginTop: 10 }} className="card-body grid-3">
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            companies.map(RenderCompany)
          )}
        </div>
      </div>
    </div>
  );
}
