import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect, useContext, useRef } from "react";
import { DarkModeContext, successContext, userContext } from "./context";
import axios from "axios";
import UserProfile from "./userProfile";

function Header() {
  const { isDark, setIsDark } = useContext(DarkModeContext);
  const { success, setSuccess } = useContext(successContext);
  const { user, setUser } = useContext(userContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function setCurrWindowWidth() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", setCurrWindowWidth);
    return () => {
      window.removeEventListener("resize", setCurrWindowWidth);
    };
  });

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

  async function logout() {
    try {
      await axios.get("/api/v1/users/logout", {
        withCredentials: true,
      });
      // closeNav();
      setSuccess(false);
      setUser(null);
      window.location.assign("/");
    } catch (err) {
      console.log(err);
    }
  }

  let navRef = useRef();

  function openNav() {
    if (navRef.current.style.display === "none") {
      navRef.current.style.display = "flex";
    } else {
      navRef.current.style.display = "none";
    }
  }

  useEffect(() => {
    if (windowWidth < 651) {
      navRef.current.style.display = "none";
    } else {
      navRef.current.style.display = "flex";
    }
  });

  function closeNav() {
    if (windowWidth > 650) return;
    return (navRef.current.style.display = "none");
  }

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
      <div className="header--right" ref={navRef} onClick={closeNav}>
        <ul className="header--right__ul">
          <Link className="link" to="/Contact">
            <li className="header--right__ul__li">Contact</li>
          </Link>
          {success ? (
            <button className="logout" onClick={logout}>
              logout
            </button>
          ) : (
            <Link className="link" to="/">
              <li className="header--right__ul__li">login</li>
            </Link>
          )}
        </ul>
        {/* <div
          onClick={handleDarkMode}
          className={
            isDark ? "header--right__toggler dark" : "header--right__toggler"
          }
        ></div> */}
        {user && <UserProfile />}
      </div>

      <div className="navbar">
        <div
          onClick={handleDarkMode}
          className={
            isDark ? "header--right__toggler dark" : "header--right__toggler"
          }
        ></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="fa-bars"
          onClick={openNav}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
      </div>
    </header>
  );
}

export default Header;
