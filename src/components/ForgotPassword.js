import axios from "axios";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  function getUserEmail(e) {
    setEmail(e.target.value);
  }

  async function sendUserEmail(e) {
    e.preventDefault();
    try {
      await axios.post("/api/v1/users/forgotPassword", { email: email });
      setIsSent(true);
      setErrMsg("");
    } catch {
      setErrMsg("Error. Try again later.");
      setIsSent(false);
    }
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
        onSubmit={sendUserEmail}
      >
        {isSent && <p>password reset link has been sent to your email. </p>}
        {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
        <input
          type="email"
          placeholder="email here"
          style={{
            height: "30px",
            width: "250px",
            borderRadius: ".5em",
            textIndent: "1em",
          }}
          value={email}
          onChange={getUserEmail}
        />
        <button
          style={{
            padding: ".2em 2em",
            borderRadius: ".2em",
            fontWeight: "600",
          }}
        >
          send
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
