import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";

const Update = ({ setOpenUpdate }) => {
  const { currentUser, successMessage } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [texts, setTexts] = useState({
    username: currentUser.username,
    email: currentUser.email,
    profilePic: currentUser.profilePic,
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

  // HANDLE UPDATE USER
  const mutation = useMutation(
    async (user) =>
      await makeRequest
        .put(`/users/${currentUser.userId}`, user)
        .then((res) => res.status === 200 && successMessage(res.data.message)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    let profileUrl = file ? await upload(file) : currentUser.profilePic;
    mutation.mutate({ ...texts, profilePic: profileUrl });

    setOpenUpdate(false);
    setFile("");
  };

  return (
    <div className="update">
      <h3>Update Profile</h3>
      <form>
        <input
          type="text"
          name="username"
          value={texts.username}
          onChange={handleChange}
          placeholder="edit username"
        />
        <input
          type="text"
          name="email"
          value={texts.email}
          onChange={handleChange}
          placeholder="edit email"
        />
        <p>
          <label htmlFor="inputTag">
            Select Image
            <input
              id="inputTag"
              type="file"
              placeholder="Choose a image ..."
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          {file && <span onClick={() => setFile(null)}>Delete Image</span>}
        </p>
        {file && <img src={URL.createObjectURL(file)} alt="" />}
        <button onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default Update;
