import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  DarkModeContext,
  MessageProvider,
  SuccessProvider,
  UserProvider,
  ModalProvider,
  LoadingProvider,
} from "./components/context";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserPage from "./components/MyPage";
import EditProfile from "./components/EditProfile";
import AllUsers from "./components/AllUsers";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

export default function App() {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );

  return (
    <Router>
      <DarkModeContext.Provider value={{ isDark, setIsDark }}>
        <LoadingProvider>
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
                    <Route path="/MyPage" element={<UserPage />} />
                    <Route path="/EditProfile" element={<EditProfile />} />
                    <Route path="/AllUsers" element={<AllUsers />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                  </Routes>
                  <Footer />
                </ModalProvider>
              </MessageProvider>
            </UserProvider>
          </SuccessProvider>
        </LoadingProvider>
      </DarkModeContext.Provider>
    </Router>
  );
}
