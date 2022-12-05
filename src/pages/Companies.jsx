import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getManagementLocations } from "../actions/management";
import { GoLocation, GoPencil } from "react-icons/go";

import { Input } from "../components/form";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.common.loading);
  const companies = useSelector((state) => state.common?.companies ?? []);

  const renderCompany = (company) => (
    <div className="card" key={company.id}>
      <div className="card-header">{company.full_name}</div>
      <div className="card-body">
        <h5 className="card-title">{company.email}</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </div>
      <div className="card-footer text-muted">
        <button className="btn btn-primary">
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
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </h4>
        <div className="card-body grid-3">{companies.map(renderCompany)}</div>
      </div>
    </div>
  );
}
