import { useState } from "react";
import { GoLocation, GoPencil } from "react-icons/go";
import { FaCalendar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import CourtEditModal from "./CourtEditModal";

export default function () {
  const { id } = useParams(); // location id
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);
  function openCourtEditModal(court_id) {
    setModalVisible(true);
  }

  function openTimeline(court_id) {
    navigate(`/court/timeline/${court_id}`)
  }

  const renderCourt = (court) => (
    <tr key={court.id}>
      <td>
        <div className="d-flex align-items-center">
          <GoLocation size={25} />
          <div className="ms-3">
            <p className="fw-bold mb-1">{court.name}</p>
          </div>
        </div>
      </td>
      <td style={{ width: 200 }}>
        <button
          type="button"
          className="btn btn-link btn-sm btn-rounded"
          onClick={() => openCourtEditModal(court.id)}
        >
          <GoPencil size={20} />
        </button>
        <button
          type="button"
          className="btn btn-link btn-sm btn-rounded"
          onClick={() => openTimeline(court.id)}
        >
          <FaCalendar size={20} />
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <div className="center" style={{ marginTop: 20 }}>
        <div className="card main-container card-max-height">
          <h4 className="card-header">Courts</h4>
          <div className="card-body">
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: "Prvo igrisce" },
                  { id: 2, name: "Drugo igrisce" },
                ].map(renderCourt)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CourtEditModal isVisible={modalVisible} setVisible={setModalVisible} />
    </>
  );
}
