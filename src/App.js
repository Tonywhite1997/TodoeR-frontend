import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  DarkModeContext,
  MessageProvider,
  SuccessProvider,
  UserProvider,
  ModalProvider,
} from "./components/context";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );

  return (
    <Router>
      <DarkModeContext.Provider value={{ isDark, setIsDark }}>
        <SuccessProvider>
          <UserProvider>
            <MessageProvider>
              <ModalProvider>
                <Header />
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/Contact" element={<Contact />} />
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Signup" element={<Signup />} />
                </Routes>
                <Footer />
              </ModalProvider>
            </MessageProvider>
          </UserProvider>
        </SuccessProvider>
      </DarkModeContext.Provider>
    </Router>
  );
}
