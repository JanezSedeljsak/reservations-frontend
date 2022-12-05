import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitButton, Input } from "../../../components/form";

export default function ({ isVisible, setVisible }) {
  const loading = useSelector((state) => state.user.loading); // change to court loading
  const navigate = useNavigate();

  const nameRef = useRef();
  const typeRef = useRef();

  if (!isVisible) return null;
  function handleCourtSubmit() {
    alert("court submit");
  }

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Court form
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setVisible(false)}
            ></button>
          </div>
          <div className="modal-body">
            <Input reference={nameRef} id={"name"} type={"text"} />
            <Input reference={typeRef} id={"type"} type={"text"} />
          </div>
          <div className="modal-footer">
            <SubmitButton
              onPress={handleCourtSubmit}
              label={"Update court"}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
