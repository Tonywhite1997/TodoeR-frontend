import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { modalContext } from "./context";
import Modal from "./Modal";

function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { modal, setModal } = useContext(modalContext);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  function getNewUserData(e) {
    e.preventDefault();
    const { name } = e.target;
    const { value } = e.target;
    setNewUser((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function signUpNewUser(e) {
    e.preventDefault();
    const { name, email, password, confirmPassword, age } = newUser;
    try {
      // if (!name || !email || !password || !confirmPassword || age) {
      //   return setErrorMsg("All fields are required");
      // }
      const res = await axios.post("/api/v1/users/signup", {
        name,
        email,
        age,
        password,
        confirmPassword,
      });
      setSignUpSuccess(true);
      setModal(false);
    } catch (err) {
      console.log(err);
      setModal(true);
      if (err.response.status === 500) {
        return setErrorMsg(err.response.statusText);
      }
      const { message } = err.response.data;
      setErrorMsg(message);
    }
  }

  useEffect(() => {
    if (signUpSuccess) {
      navigate("/Home");
    }
  }, [signUpSuccess]);

  return (
    <>
      <p className="signup-p">
        Welcome to Todoer App, Please login or register to continue
      </p>
      <form className="signup-form">
        <input
          type="text"
          placeholder="John Doe"
          name="name"
          value={newUser.name}
          onChange={(e) => {
            getNewUserData(e);
          }}
        ></input>
        <input
          type="text"
          placeholder="john@gmail.com"
          name="email"
          value={newUser.email}
          onChange={(e) => {
            getNewUserData(e);
          }}
        ></input>
        <input
          type="number"
          placeholder="age"
          name="age"
          value={newUser.age}
          onChange={(e) => {
            getNewUserData(e);
          }}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={newUser.password}
          onChange={(e) => {
            getNewUserData(e);
          }}
        ></input>
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={newUser.confirmPassword}
          onChange={(e) => {
            getNewUserData(e);
          }}
        ></input>
        <button
          className="signupBtn"
          onClick={(e) => {
            signUpNewUser(e);
          }}
        >
          Register
        </button>
        {modal && <Modal message={errorMsg} />}
        <p>
          Have an acount?{" "}
          <Link className="signup-link" to="/">
            login
          </Link>
        </p>
      </form>
    </>
  );
}

export default Signup;
