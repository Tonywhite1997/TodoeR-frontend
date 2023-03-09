import axios from "axios";
import React, { useState, useContext } from "react";
import { successContext, loadingContext } from "./context";
import AdminEditUser from "./AdminEditUser";

function AllUsers() {
  const [users, setUsers] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [adminUpdating, setAdminUpdating] = useState({
    user: {},
    isUpdating: false,
  });

  const { success } = useContext(successContext);
  const { isLoading } = useContext(loadingContext);

  async function getUsers() {
    try {
      const email = userEmail.trim();
      if (email) {
        const users = await axios.get(
          `/api/v1/users?email=${email}&role[ne]=admin`,
          {
            withCredentials: true,
          }
        );
        setUsers(users.data);
      } else {
        const users = await axios.get(`/api/v1/users?role[ne]=admin`);
        setUsers(users.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteUser(userId) {
    try {
      const latestUsers = await axios.delete(`/api/v1/users/${userId}`);
      setUsers(latestUsers);
      alert("User deleted");
      // document.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <p className="main"></p>;
  }

  if (!success) {
    return window.location.assign("/");
  }
  return (
    <div className="admin-search">
      <div className="single-user-div">
        <label htmlFor="email">Fetch By Email</label>
        <input
          id="email"
          placeholder="user email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button onClick={getUsers}>Search</button>
      </div>
      <div className="table-div">
        {!adminUpdating.isUpdating && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.data.users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>{user.role}</td>
                      <td className="action-row">
                        <button
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setAdminUpdating({ user, isUpdating: true });
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {adminUpdating.isUpdating && (
          <AdminEditUser user={adminUpdating.user} />
        )}
      </div>
    </div>
  );
}

export default AllUsers;
