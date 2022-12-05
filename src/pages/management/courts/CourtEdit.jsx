import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { Input, SubmitButton } from "../../../components/form";

export default function () {
  const loading = useSelector((state) => state.management.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function renderEdit() {
    return <>edit tab</>;
  }

  function renderTabsHeader() {
    return (
      <ul className="nav nav-tabs mb-3" id="ex-with-icons" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="ex-with-icons-tab-1"
            data-mdb-toggle="tab"
            href="#ex-with-icons-tabs-1"
            role="tab"
            aria-controls="ex-with-icons-tabs-1"
            aria-selected="true"
          >
            <i className="fas fa-pencil fa-fw me-2"></i>Edit
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="ex-with-icons-tab-2"
            data-mdb-toggle="tab"
            href="#ex-with-icons-tabs-2"
            role="tab"
            aria-controls="ex-with-icons-tabs-2"
            aria-selected="false"
          >
            <i className="fas fa-calendar fa-fw me-2"></i>Calendar
          </a>
        </li>
      </ul>
    );
  }

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="card main-container card-max-height">
        <h4 className="card-header">Court - {"ful kul court"}</h4>
        {renderTabsHeader()}
        <div className="tab-content" id="ex-with-icons-content" style={{ padding: 10 }}>
          <div
            className="tab-pane fade show active"
            id="ex-with-icons-tabs-1"
            role="tabpanel"
            aria-labelledby="ex-with-icons-tab-1"
          >
            Tab 1 content
          </div>
          <div
            className="tab-pane fade"
            id="ex-with-icons-tabs-2"
            role="tabpanel"
            aria-labelledby="ex-with-icons-tab-2"
          >
            Tab 2 content
          </div>
          <div
            className="tab-pane fade"
            id="ex-with-icons-tabs-3"
            role="tabpanel"
            aria-labelledby="ex-with-icons-tab-3"
          >
            Tab 3 content
          </div>
        </div>
      </div>
    </div>
  );
}
