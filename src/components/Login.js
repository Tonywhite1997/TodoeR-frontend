import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { successContext, userContext, modalContext } from "./context";
import Modal from "./Modal";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, seterrorMsg] = useState("");

  const { success, setSuccess } = useContext(successContext);
  const { setUser } = useContext(userContext);
  const { modal, setModal } = useContext(modalContext);
  const navigate = useNavigate();

  function collectLoginData(e) {
    e.preventDefault();
    const { name } = e.target;
    const { value } = e.target;
    setLoginData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function loginUser(e) {
    e.preventDefault();
    try {
      const user = await axios.post("/api/v1/users/login", {
        email: loginData.email,
        password: loginData.password,
      });
      setModal(false);
      setUser(user.data);
      setSuccess(true);
    } catch (err) {
      if (err.response.status === 500) {
        return seterrorMsg(err.response.statusText);
      }
      const { message } = err.response.data;
      setModal(true);
      seterrorMsg(message);
    }
  }
  useEffect(() => {
    if (success) {
      navigate("/Home");
    }
  }, [success]);

  return (
    <>
      <p className="welcome">
        Welcome to Todoer App, Please login or register to continue
      </p>
      <form className="form">
        <input
          type="text"
          placeholder="john@gmail.com"
          name="email"
          value={loginData.email}
          onChange={(e) => collectLoginData(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={loginData.password}
          onChange={(e) => collectLoginData(e)}
        ></input>
        <button onClick={(e) => loginUser(e)} className="loginBtn">
          Login
        </button>
        {modal && <Modal message={errorMsg} color={"red"} />}
        <p>
          Don't have an account?{" "}
          <Link className="signupBtn" to="/Signup">
            sign up
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
