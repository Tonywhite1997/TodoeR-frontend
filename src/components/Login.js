import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { successContext, userContext } from "./context";
import Footer from "./Footer";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [iserror, setIsError] = useState(false);

  const { success, setSuccess } = useContext(successContext);
  const { setUser } = useContext(userContext);

  function collectLoginData(e) {
    e.preventDefault();
    setIsError(false);
    setMessage("");
    const { name } = e.target;
    const { value } = e.target;
    setLoginData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function loginUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/login", {
        email: loginData.email.trim(),
        password: loginData.password.trim(),
      });

      setUser(data);
      setSuccess(true);
    } catch (err) {
      setIsError(true);
      if (err.response.status === 500) {
        return setMessage("An error occur. Please try again later");
      } else if (err.response.status === 404) {
        setMessage("Invalid email or password");
      } else if (err.response.status === 400) {
        setMessage("Email or Password field cannot be empty");
      } else if (err.response.status === 429) {
        setMessage("Too many requests, try again later");
      } else if (err.code === "ERR_NETWORK") {
        setMessage("Error, try again later");
      }
    }
  }
  let navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate("/Home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [success, navigate]);

  const passwordRef = useRef();

  function revealPassword() {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else if (passwordRef.current.type === "text") {
      passwordRef.current.type = "password";
    }
  }

  return (
    <>
      <form className="form">
        <p className="welcome">
          Welcome to Todoer App, Please login or register to continue
        </p>
        <input
          type="text"
          placeholder="john@gmail.com"
          name="email"
          value={loginData.email}
          onChange={(e) => collectLoginData(e)}
        ></input>
        <div className="password-div">
          <input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="password"
            value={loginData.password}
            onChange={(e) => collectLoginData(e)}
          ></input>
          <svg
            onClick={revealPassword}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="eye"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
        <button onClick={(e) => loginUser(e)} className="loginBtn">
          Login
        </button>
        {iserror && message && <p style={{ color: "red" }}>{message}</p>}
        <Link style={{ color: "white" }} to="/forgot-password">
          forgot password
        </Link>
        <p style={{ marginTop: "-1.5em" }}>
          Don't have an account?{" "}
          <Link className="signupBtn" to="/auth/sign-up">
            sign up
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
