import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import axios from "axios";

export const DarkModeContext = createContext();
export const userContext = createContext();
export const messageContext = createContext();
export const isModalContext = createContext();
export const successContext = createContext();
export const loadingContext = createContext();

export function SuccessProvider({ children }) {
  const [success, setSuccess] = useState(false);
  return (
    <successContext.Provider value={{ success, setSuccess }}>
      {children}
    </successContext.Provider>
  );
}

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <loadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </loadingContext.Provider>
  );
}

export function IsModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <isModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, message, setMessage }}
    >
      {children}
    </isModalContext.Provider>
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
  const { setSuccess } = useContext(successContext);
  const { setIsLoading } = useContext(loadingContext);
  const [user, setUser] = useState(null);
  const persistLogin = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/users/profile", {
        withCredentials: true,
      });
      setUser(data);
      setSuccess(true);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  }, [setIsLoading, setSuccess]);
  useEffect(() => {
    if (!user) {
      persistLogin();
    }
  }, [user, persistLogin]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
