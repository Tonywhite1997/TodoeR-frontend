import {
  DarkModeContext,
  userContext,
  successContext,
  loadingContext,
} from "./context";
import { useContext, useState } from "react";
import axios from "axios";

function EditProfile() {
  const { isDark } = useContext(DarkModeContext);
  const { user } = useContext(userContext);
  const { success } = useContext(successContext);
  const { isLoading } = useContext(loadingContext);

  const [editInfo, setEditInfo] = useState({
    name: user?.user?.name,
    age: user?.user?.age,
    photo: null,
  });

  function getUpdatedUserInfo(e) {
    const { name } = e.target;
    const { value } = e.target;
    setEditInfo((prevState) => {
      if (name !== "photo") {
        return { ...prevState, [name]: value };
      } else {
        return { ...prevState, [name]: e.target.files[0] };
      }
    });
  }

  async function updateUserInfo(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("photo", editInfo.photo);
      data.append("age", editInfo.age);
      data.append("name", editInfo.name);

      await axios.patch("/api/v1/users/updateMe", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      document.location.assign("/MyPage");
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
    <div className="edit-page">
      <p>Update your information</p>
      <form
        onSubmit={updateUserInfo}
        className="edit-form"
        style={{ boxShadow: !isDark && "0 0 2px black" }}
      >
        <label>Your Name</label>
        <input
          placeholder="name"
          name="name"
          value={editInfo.name}
          onChange={getUpdatedUserInfo}
        />
        <label>Your Age</label>
        <input
          placeholder="age"
          name="age"
          value={editInfo.age}
          onChange={getUpdatedUserInfo}
        />
        <label
          className="upload-photo"
          style={{ border: !isDark && "1px solid black" }}
        >
          Upload new photo
          <input
            onChange={getUpdatedUserInfo}
            type="file"
            name="photo"
            accept="image/png, image/jpg, image/gif, image/jpeg"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="camera-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
        </label>
        <button>Update</button>
      </form>
    </div>
  );
}

export default EditProfile;
