import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import moment from "moment";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RemoveFeed } from "../services/fetch/loadFeeds.js";
import FeedActions from "./Feed/FeedActions.jsx";
import FeedImage from "./Feed/FeedImage.jsx";
import FeedInfo from "./Feed/FeedInfo.jsx";
import FeedContent from "./Feed/FeedContent.jsx";

const Feed = ({ feed }) => {
  const { title, feedId, name, createdFeed, content, image, author, avatar } =
    feed;
  const { currentUser, successMessage } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // HANDLE REMOVE FEED
  const mutaion2 = useMutation(
    async () => await RemoveFeed(feedId, successMessage),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["feeds"]);
      },
    }
  );
  const handleRemove = () => {
    if (currentUser.id === author) {
      mutaion2.mutate();
    }
  };

  return (
    <Link to={`/feeds/${title}/${feedId}`} className="link">
      <div className="feed">
        <FeedImage image={image} />

        <div className="feedContent">
          <FeedInfo
            avatar={avatar}
            author={author}
            name={name}
            createdFeed={createdFeed}
          />

          <FeedContent title={title} content={content} />

          <FeedActions feedId={feedId}/>
        </div>
      </div>
    </Link>
  );
};

export default Feed;
