import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { currentUser, successMessage, setCurrentUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const [texts, setTexts] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatar: currentUser.avatar,
    bio: currentUser.bio || null,
  });

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  // UPLOAD IMAGE
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/uploads", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE EditProfile USER
  const mutation = useMutation(
    async (user) =>
      await makeRequest.patch(`/users/${currentUser.id}`, user).then((res) => {
        res.status === 200 && successMessage(res.data.message);
        setCurrentUser(res.data.updatedUser);
      })
  );

  const handleEditProfile = async (e) => {
    e.preventDefault();

    let avatarURL = file ? await upload(file) : currentUser.avatar;
    mutation.mutate({ ...texts, avatar: avatarURL });

    navigate("/");
  };

  return (
    <div className="editProfile">
      <h1>Edit For {currentUser.name}</h1>
      <div className="container">
        <div className="left"></div>
        <div className="right">
          <form>
            <div className="formGroup">
              <h3>User</h3>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={texts.name}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={texts.email}
                onChange={handleChange}
              />
              <label htmlFor="avatar">Profile image</label>
              <p>
                <img
                  src={
                    "/images/" + (currentUser.avatar || "default_avatar.png")
                  }
                  alt=""
                />
                <input
                  id="inputTag"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </p>
            </div>

            <div className="formGroup">
              <h3>Basic</h3>
              <label htmlFor="websiteURL">Website URL</label>
              <input
                type="text"
                name="websiteURL"
                value={texts.name}
                onChange={handleChange}
              />
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={texts.email}
                onChange={handleChange}
              />
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                name="bio"
                value={texts.bio}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleEditProfile}>EditProfile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
