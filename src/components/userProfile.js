import { userContext } from "./context";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyImage from "./default.jpg";

function UserProfile() {
  const { user } = useContext(userContext);

  const [imageData, setImageData] = useState("");
  //   console.log({ profile: user });
  const name = user?.user?.name.split(" ")[0];
  const photo = user?.user?.photo;
  const getImage = useCallback(
    async function getImage() {
      try {
        const { data } = await axios.get(`/api/v1/users/picture/${photo}`, {
          responseType: "arraybuffer",
        });
        const blob = new Blob([data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } catch {
        setImageData(MyImage);
      }
    },
    [photo]
  );
  useEffect(() => {
    getImage();
  }, [photo, getImage]);

  return (
    <>
      <Link to={"/MyPage"} className="user-profile">
        <img src={imageData} alt={name} />
      </Link>
    </>
  );
}

export default UserProfile;
