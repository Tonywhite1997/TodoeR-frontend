import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { DarkModeContext } from "./context";

function Header() {
  const { isDark, setIsDark } = useContext(DarkModeContext);

  function handleDarkMode() {
    setIsDark((prevState) => !prevState);
  }

  useEffect(() => {
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);

  useEffect(() => {
    document.body.className = isDark
      ? (document.body.className = "dark--mode")
      : "";
  }, [isDark]);
  return (
    <header className="header">
      <Link className="link" to="/">
        <div className="header--logo">
          <img
            className="header--logo__image"
            src="../images/logo.png"
            alt="my-logo"
          />
        </div>
      </Link>
      <div className="header--right">
        <ul className="header--right__ul">
          <Link className="link" to="/Contact">
            <li className="header--right__ul__li">Contact</li>
          </Link>
        </ul>
        <div
          onClick={handleDarkMode}
          className={
            isDark ? "header--right__toggler dark" : "header--right__toggler"
          }
        ></div>
      </div>
    </header>
  );
}

export default Header;
