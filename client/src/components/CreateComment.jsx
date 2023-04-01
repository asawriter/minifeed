import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import makeRequest from "../services/makeRequest";

const CreateComment = ({ parentFeed, author, typeBtn, parentId = null, setOpenReplyCm, setShowReplyCm }) => {
  console.log(parentId)
  const [content, setContent] = useState("");
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

    mutaion.mutate({ content, parentFeed, author, parentId });
    setContent("");
    setOpenReplyCm(false);
    setShowReplyCm(true);
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
        autoFocus
      />
      <button onClick={handleComment}>{typeBtn}</button>
    </form>
  );
};

export default CreateComment;
