import React from "react";
import "../assets/authform.css";
import Logo from "../assets/LogoVertical.svg";

export default function ({ children }) {
  return (
    <div className="auth-wrapper">
      <div className="center banner">
        <img src={Logo} style={{ width: 250 }} />
        <figure className="text-center" style={{ width: "66%" }}>
          <blockquote className="blockquote">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
          </blockquote>
          <figcaption className="blockquote-footer">
            © Janez, Brina, Luka, Vid, Miha (2022)
          </figcaption>
        </figure>
      </div>
      <div className="center form-container">{children}</div>
    </div>
  );
}
