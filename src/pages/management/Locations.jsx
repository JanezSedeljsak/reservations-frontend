import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getManagementLocations } from "../../actions/management";
import { GoLocation, GoPencil } from "react-icons/go";
import { BASE } from "../../utils";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.management.loading);
  const locations = useSelector((state) => state.management?.locations ?? []);

  function openLocation(id) {
    navigate(`${BASE}location/edit/${id}`);
  }

  const renderLocation = (location) => (
    <tr key={location.id}>
      <td>
        <div className="d-flex align-items-center">
          <GoLocation size={25} />
          <div className="ms-3">
            <p className="fw-bold mb-1">{location.name}</p>
            <p className="text-muted mb-0">
              {location.website_url ?? "No url provided"}
            </p>
          </div>
        </div>
      </td>
      <td style={{ width: 200 }}>
        <button
          type="button"
          className="btn btn-link btn-sm btn-rounded"
          onClick={() => openLocation(location.id)}
        >
          <GoPencil size={20} />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card main-container card-max-height">
        <h4 className="card-header">Management locations</h4>
        <div className="card-body">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{locations.map(renderLocation)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
