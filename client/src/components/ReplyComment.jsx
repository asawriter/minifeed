import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";

const ReplyComment = ({ feedId, setIsReply, setOpenComment }) => {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");
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
    
    mutaion.mutate({ message, feedId, userId: currentUser.userId });
    setOpenComment(false);
    setIsReply(true);
    setMessage("");
  };

  return (
    <form>
      <textarea
        autoFocus
        name="comment"
        id="comment"
        cols="20"
        rows="10"
        placeholder="What are your thought?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleComment}>Reply</button>
    </form>
  );
};

export default ReplyComment;
