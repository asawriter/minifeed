import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";

const CreateComment = ({cms }) => {
  const {currentUser} = useContext(AuthContext)
  const [message, setMessage] = useState("");
  const feedId = useLocation().pathname?.split("/")[2];

  const queryClient = useQueryClient();

  const mutaion = useMutation(
    (newCm) => {
      return makeRequest.post("/comments", newCm);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleComment = (e) => {
    e.preventDefault();

    mutaion.mutate({ message, feedId, userId: currentUser.userId });

    // scrollToBottom();

    setMessage("");
  };

  return (
    <form>
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        placeholder="What are your thought?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleComment}>Comment</button>
    </form>
  );
};

export default CreateComment;
