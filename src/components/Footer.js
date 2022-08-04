import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context";

function Footer() {
  const { isDark } = useContext(DarkModeContext);
  return (
    <footer
      style={{ color: isDark ? "#06060a" : "#06060a" }}
      className="footer"
    >
      <Link to="/">
        <div className="footer--logo">
          <img src="../images/logo.png" />
        </div>
      </Link>
      <p className="footer--copywright">copywright. All rights reserved.</p>
      <div className="footer--icons">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-twitter"></i>
      </div>
    </footer>
  );
}

export default Footer;
