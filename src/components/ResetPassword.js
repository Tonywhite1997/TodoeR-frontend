import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
function ResetPassword() {
  const [newData, setNewData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [invalid, setInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function checkResetToken() {
    const searchParams = new URLSearchParams(location.search);
    const resetToken = searchParams.get("resetToken");

    return resetToken;
  }

  useEffect(() => {
    const resetToken = checkResetToken();
    if (!resetToken) {
      setInvalid(true);
    }
  }, [location]);

  function getNewUserPassword(e) {
    setNewData((prevData) => {
      const { name } = e.target;
      const { value } = e.target;
      return { ...prevData, [name]: value };
    });
  }

  async function sendNewUserPassword(e) {
    e.preventDefault();
    const resetToken = checkResetToken();
    try {
      await axios.patch(
        `/api/v1/users/resetPassword?resetToken=${resetToken}`,
        {
          password: newData.newPassword,
          confirmPassword: newData.confirmPassword,
        }
      );
      setSuccess(true);
    } catch {
      setErrorMsg("Error. Try again later.");
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 3000);
    }
  }, [success]);
  //   useEffect(() => {
  //     const timeOut = setTimeout(() => {
  //       setErrorMsg("");
  //     }, 3000);
  //     return () => {
  //       clearTimeout(timeOut);
  //     };
  //   }, [errorMsg]);

  if (invalid) {
    return (
      <div className="main">
        <p style={{ marginTop: "1em", textAlign: "center", width: "90%" }}>
          Invalid reset link. to reset your password, click on <br />
          <Link style={{ color: "white" }} to="/forgot-password">
            {" "}
            forgot password
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid white",
          padding: "5em 3em",
        }}
        onSubmit={sendNewUserPassword}
      >
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {success && <p>Password changed. you will be redirected to log in</p>}
        <input
          type="password"
          placeholder="new password"
          style={{
            height: "30px",
            width: "250px",
            borderRadius: ".5em",
            textIndent: "1em",
          }}
          name="newPassword"
          value={newData.newPassword}
          onChange={getNewUserPassword}
        />
        <input
          type="password"
          placeholder="confirm password"
          style={{
            height: "30px",
            width: "250px",
            borderRadius: ".5em",
            textIndent: "1em",
          }}
          name="confirmPassword"
          value={newData.confirmPassword}
          onChange={getNewUserPassword}
        />
        <button
          style={{
            padding: ".2em 2em",
            borderRadius: ".2em",
            fontWeight: "600",
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
