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
          <img src="../images/logo.png" alt="web-logo" />
        </div>
      </Link>
      <p className="footer--copywright">copywright. All rights reserved.</p>
      <div className="footer--icons">
        <a href="https://web.facebook.com/?_rdc=1&_rdr">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="https://github.com/Tonywhite1997">
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
