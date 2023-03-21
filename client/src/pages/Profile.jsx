import { useQuery } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Update from "../components/Update";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = useLocation().pathname.split("/")[2];
  const [openUpdate, setOpenUpdate] = useState(false);

  const { isLoading, data, error } = useQuery(["users"], () => 
    makeRequest.get(`/users/find/${userId}`).then((res) => res.data.user[0]));

  return (
    <div className="profile">
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Somethings wents wrong ...</p>
      ) : (
        <div className="container">
          <img src={"/images/" + (data.profilePic || "default_avatar.png")} alt="" />
          <p className="username"> Name : <span>{data.username}</span> </p>
          <p className="email"> Email : <span>{data.email}</span> </p>
          {currentUser.username === data.username && (
            <div className="btns">
              <button onClick={() => setOpenUpdate(true)}>Edit Profile</button>
              <button>New Post</button>
            </div>
          )}
        </div>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} />}
    </div>
  );
};

export default Profile;
