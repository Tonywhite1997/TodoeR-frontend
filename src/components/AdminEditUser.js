import axios from "axios";
import React, { useState } from "react";

function AdminEditUser({ user }) {
  const [newUserData, setNewUserData] = useState({
    name: user.name,
    age: user.age,
    role: user.role,
    isActive: user.isActive,
  });

  function getUpdatedUserData(e) {
    const { name } = e.target;
    const { value } = e.target;
    setNewUserData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  async function submitUpdatedUser(e) {
    e.preventDefault();
    try {
      await axios.patch(`/api/v1/users/${user._id}`, newUserData);
      alert("user updated");
      document.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <form onSubmit={submitUpdatedUser} className="edit-form">
        <div className="container">
          <label>name</label>
          <input
            type="text"
            name="name"
            value={newUserData.name}
            onChange={(e) => {
              getUpdatedUserData(e);
            }}
          />
        </div>
        <div className="container">
          <label>age</label>
          <input
            type="number"
            name="age"
            value={newUserData.age}
            onChange={getUpdatedUserData}
          />
        </div>
        <div className="container">
          <label>user role</label>
          <select
            name="role"
            value={newUserData.role}
            onChange={getUpdatedUserData}
          >
            <option>user</option>
            <option>admin</option>
          </select>
        </div>
        <div className="container">
          <label>active status</label>
          <select
            name="isActive"
            value={newUserData.isActive}
            onChange={getUpdatedUserData}
          >
            <option>true</option>
            <option>false</option>
          </select>
        </div>
        <button>Update</button>
      </form>
    </>
  );
}

export default AdminEditUser;
