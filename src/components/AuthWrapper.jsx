import React from "react";
import "../assets/authform.css";

export default function ({ children }) {
  return (
    <div className="auth-wrapper">
      <div className="center banner">
        <img
          src={
            "https://icon-library.com/images/reservation-icon-png/reservation-icon-png-29.jpg"
          }
          style={{ height: 150, width: 150 }}
        />
        <figure className="text-center">
          <blockquote className="blockquote">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
          <button
            type="button"
            className="btn btn-info btn-rounded"
            data-mdb-ripple-color="dark"
          >
            Browse anonymously
          </button>
        </figure>
      </div>
      <div className="center form-container">{children}</div>
    </div>
  );
}
