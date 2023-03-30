import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RxBookmark } from "react-icons/rx";
import { VscComment } from "react-icons/vsc";
import { AuthContext } from "../../context/AuthContext";
import {
  AddLiked,
  GetLikes,
  RemoveLiked,
} from "../../services/fetch/loadLikes";

const FeedActions = ({ feedId, titleURL, scrollToCm }) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // GET LIKES OF EVERY FEED
  const { isLoading, data, error } = GetLikes("likes", feedId);

  // HANDLE LIKE AND DISLIKE
  const mutaion = useMutation(
    (liked) => {
      if (liked) return RemoveLiked(feedId, currentUser.id);
      return AddLiked(feedId, currentUser.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLiked = () => {
    mutaion.mutate(data?.includes(currentUser.id));
  };

  return (
    <div className="actions">
      <div className="left">
        <ul>
          <li>
            {isLoading ? (
              <p>Loading</p>
            ) : error ? (
              <p>Somthing went wrong</p>
            ) : data?.includes(currentUser.id) ? (
              <AiFillHeart
                className="f-icon"
                onClick={handleLiked}
                style={{ color: "red" }}
              />
            ) : (
              <AiOutlineHeart className="f-icon" onClick={handleLiked} />
            )}
            <span>
              {data?.length} {!titleURL && "likes"}
            </span>
          </li>
          <li>
            <VscComment className="f-icon" onClick={scrollToCm}/>
            <span>6 {!titleURL && "comments"}</span>
          </li>
          <li className="actionSaved">
            <RxBookmark className="f-icon" />
            <span>3</span>
          </li>
          <li className="actionSaved">
            <BsThreeDots className="f-icon" />
          </li>
        </ul>
      </div>

      <div className="right">
        <p>
          <RxBookmark className="f-icon" />
        </p>
      </div>
    </div>
  );
};

export default FeedActions;
