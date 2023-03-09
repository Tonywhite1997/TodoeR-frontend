import { useContext, useState } from "react";
import { userContext } from "./context";
import { Link } from "react-router-dom";
import { successContext, loadingContext } from "./context";
import axios from "axios";

function UserPage() {
  const { success } = useContext(successContext);
  const { user } = useContext(userContext);
  const { isLoading } = useContext(loadingContext);

  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const name = user?.user?.name;
  const email = user?.user?.email;
  const age = user?.user?.age;
  const role = user?.user?.role;
  const createdAtRaw = user?.user?.createdAt;
  const date = new Date(createdAtRaw);
  const createdAt = `${date.toDateString().split(" ").slice(1).join(" ")}`;

  async function deleteAccount(e) {
    e.preventDefault();
    try {
      await axios.patch("/api/v1/users/deleteMe", { password });
      alert("Deleted successfully");
      document.location.assign("/");
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <p className="main"></p>;
  }

  if (!success) {
    return document.location.assign("/");
  }

  return (
    <div className="my-page">
      <p className="name-div">
        You are logged in as <span className="name">{name}</span>
      </p>

      <div className="profile-fields">
        <div className="profile-field">
          <div className="field">
            <h5>Name:</h5>
          </div>
          <div className="value">
            <p>{name}</p>
          </div>
        </div>
        <div className="profile-field">
          <div className="field">
            <h5>Email:</h5>
          </div>
          <div className="value">
            <p>{email}</p>
          </div>
        </div>
        <div className="profile-field">
          <div className="field">
            <h5>Age:</h5>
          </div>
          <div className="value">
            <p>{age}</p>
          </div>
        </div>
        <div className="profile-field">
          <div className="field">
            <h5>Role:</h5>
          </div>
          <div className="value">
            <p>{role}</p>
          </div>
        </div>
        <div className="profile-field">
          <div className="field">
            <h5>Created:</h5>
          </div>
          <div className="value">
            <p>{createdAt}</p>
          </div>
        </div>
      </div>
      <nav className="profile-nav">
        <Link className="nav-link" to="/EditProfile">
          Edit Profile
        </Link>
        {role === "user" && (
          <button
            className="delete-Btn"
            onClick={() => {
              setIsDeleting(true);
            }}
          >
            Delete Account
          </button>
        )}
        {role === "admin" && (
          <Link className="nav-link" to="/AllUsers">
            View Users
          </Link>
        )}
      </nav>
      {isDeleting && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            marginTop: "2em",
            alignItems: "center",
          }}
          onSubmit={deleteAccount}
        >
          <label>Confirm your password to continue</label>
          <input
            style={{
              height: "35px",
              width: "300px",
              borderRadius: ".5em",
              textIndent: "1em",
            }}
            type="password"
            placeholder="your password here"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div style={{ display: "flex", gap: "1em" }}>
            <button
              style={{ padding: ".3em 1em", borderRadius: "100vmax" }}
              onClick={() => {
                setIsDeleting(false);
              }}
            >
              Cancel
            </button>
            <button style={{ padding: ".3em 1em", borderRadius: "100vmax" }}>
              Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserPage;
