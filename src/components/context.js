import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DarkModeContext = createContext();
export const userContext = createContext();
export const messageContext = createContext();
export const modalContext = createContext();
export const successContext = createContext();

export function SuccessProvider({ children }) {
  const [success, setSuccess] = useState(false);
  return (
    <successContext.Provider value={{ success, setSuccess }}>
      {children}
    </successContext.Provider>
  );
}

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(false);
  return (
    <modalContext.Provider value={{ modal, setModal }}>
      {children}
    </modalContext.Provider>
  );
}

export function MessageProvider({ children }) {
  const [message, setMessage] = useState("kijhewgrehjfw");
  return (
    <messageContext.Provider value={{ message, setMessage }}>
      {children}
    </messageContext.Provider>
  );
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  async function persistLogin() {
    try {
      const user = await axios.get("/api/v1/users/profile", {
        withCredentials: true,
      });
      setUser(user.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (!user) {
      persistLogin();
    }
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
