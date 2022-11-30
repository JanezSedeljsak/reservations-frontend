import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getManagementLocations } from "../../actions/management";
import { GoLocation, GoPencil } from "react-icons/go";

export default function () {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.management.loading);
  const locations = useSelector((state) => state.management?.locations ?? []);

  useEffect(() => {
    dispatch(getManagementLocations());
  }, []);

  const renderLocation = (location, idx) => (
    <tr key={location.id}>
      <td>
        <div className="d-flex align-items-center">
          <GoLocation size={30} />
          <div className="ms-3">
            <p className="fw-bold mb-1">{location.name}</p>
            <p className="text-muted mb-0">
              {location.website_url ?? "No url provided"}
            </p>
          </div>
        </div>
      </td>
      <td style={{ width: 200 }}>
        <button type="button" className="btn btn-link btn-sm btn-rounded">
          <GoPencil size={30} />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div
        className="card"
        style={{ width: "90%", height: "calc(100vh - 150px)" }}
      >
        <h2 className="card-header">Management locations</h2>
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
