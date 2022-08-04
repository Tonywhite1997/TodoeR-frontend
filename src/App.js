import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { DarkModeContext } from "./components/context";

import Home from "./components/Home";
import Contact from "./components/Contact";

export default function App() {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );
  return (
    <Router>
      <DarkModeContext.Provider value={{ isDark, setIsDark }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </DarkModeContext.Provider>
    </Router>
  );
}
