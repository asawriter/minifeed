import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

const CreatePost = () => {
  const { currentUser, successMessage, errorMessage } = useContext(AuthContext);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/uploads", formData)
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }

  const mutation = useMutation(
    (newFeed) => makeRequest.post("/feeds", newFeed).then((res) => {
        if (res.status === 200) {
          successMessage(res.data.message);
        } else {
          errorMessage(res.data.message);
        }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["feeds"]);
      },
    }
  );

  const handlePost = async(e) => {
    e.preventDefault();
    let feedImgUrl = file ? await upload(file) : null
    mutation.mutate({ title, content, author: currentUser.id, image : feedImgUrl });
    navigate("/");
  };

  return (
    <div className="createPost">
      <div className="container">
          <h2>Create New Post</h2>
          <form>
            <p>
              <label htmlFor="inputTag">
                Select Image
                <input id="inputTag" type="file" placeholder="Choose a image ..." accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
              </label>
              {file && <img src={URL.createObjectURL(file)} alt="" />}
              {file && <span onClick={() => setFile(null)}>Delete Image</span>}
            </p>
            <input type="text" placeholder="New feed title here..." value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea placeholder="Write something here..." autoFocus value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handlePost}>Post</button>
          </form>
        </div>
    </div>
  );
};

export default CreatePost;
