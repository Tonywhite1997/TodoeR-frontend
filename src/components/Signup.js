import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successContext, userContext } from "./context";

function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const { success, setSuccess } = useContext(successContext);
  const { setUser } = useContext(userContext);
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
      const { data } = await axios.post("/api/v1/users/signup", {
        name,
        email,
        age,
        password,
        confirmPassword,
      });
      setErrorMsg("");
      setUser(data);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      if (err.response.data.code === 11000) {
        setErrorMsg("Email already used. Try another one");
      } else if (newUser.password !== newUser.confirmPassword) {
        setErrorMsg("Your passwords must match to continue");
      } else if (newUser.age < 12) {
        setErrorMsg("You must be 12 or older to continue");
      } else {
        setErrorMsg("Error. Try again later");
      }
    }
  }

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  return (
    <>
      <form className="signup-form">
        <p className="signup-p">
          Welcome to Todoer App, Please login or register to continue
        </p>
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
        <p className="error-msg">{errorMsg}</p>
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
