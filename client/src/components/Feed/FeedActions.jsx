import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { VscComment } from "react-icons/vsc";
import { AuthContext } from "../../context/AuthContext";
import {
  AddBookmark,
  GetFeedsBookmark,
  RemoveBookmark,
} from "../../services/fetch";
import {
  AddLiked,
  GetLikes,
  RemoveLiked,
} from "../../services/fetch/loadLikes";

const FeedActions = ({ feedId, titleURL, scrollToCm, numCm}) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // GET LIKES OF EVERY FEED
  const { isLoading, data, error } = GetLikes("likes", feedId);

  // HANDLE LIKE AND DISLIKE
  const mutaionLiked = useMutation(
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
    mutaionLiked.mutate(data?.includes(currentUser.id));
  };

  // GET BOOKMARK OF EVERY FEED
  const {
    isLoading: loadingBookmark,
    data: dataBookmark,
    error: errorBookmark,
  } = GetFeedsBookmark("bookmarks", feedId);

  const mutaionBookmarked = useMutation(
    (bookmarked) => {
      if (bookmarked) return RemoveBookmark(currentUser.id, feedId);
      return AddBookmark(currentUser.id, feedId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookmarks"]);
      },
    }
  );

  const handleBookmarked = () => {
    mutaionBookmarked.mutate(dataBookmark?.includes(currentUser.id));
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
            <VscComment className="f-icon" onClick={scrollToCm} />
            <span>{numCm?.length} {!titleURL && "comments"}</span>
          </li>
          <li className="actionSaved">
            {loadingBookmark ? (
              <p>Loading</p>
            ) : errorBookmark ? (
              <p>Somthing went wrong</p>
            ) : dataBookmark?.includes(currentUser.id) ? (
              <RxBookmarkFilled
                className="f-icon"
                onClick={handleBookmarked}
                style={{ color: "goldenrod" }}
              />
            ) : (
              <RxBookmark className="f-icon" onClick={handleBookmarked} />
            )}
            <span>
              {dataBookmark?.length}
            </span>
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
