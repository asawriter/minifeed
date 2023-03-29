import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";

const CreateComment = ({ parentFeed, author }) => {
  const [content, setContent] = useState("");
  // const feedId = useLocation().pathname?.split("/")[2];
  const queryClient = useQueryClient();

  const mutaion = useMutation(
    async (newCm) => await makeRequest.post("/comments", newCm),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleComment = (e) => {
    e.preventDefault();

    mutaion.mutate({ content, parentFeed, author });
    setContent("");
  };

  return (
    <form>
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        placeholder="What are your thought?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleComment}>Comment</button>
    </form>
  );
};

export default CreateComment;
