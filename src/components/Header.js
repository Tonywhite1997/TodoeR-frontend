import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { DarkModeContext, successContext } from "./context";

function Header() {
  const { isDark, setIsDark } = useContext(DarkModeContext);
  const { success, setSuccess } = useContext(successContext);

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
      <Link className="link" to="/Home">
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
          {success ? (
            <button>logout</button>
          ) : (
            <Link className="link" to="/">
              <li className="header--right__ul__li">login</li>
            </Link>
          )}
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
