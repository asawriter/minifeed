import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RemoveFeed } from "../../services/fetch/loadFeeds.js";
import FeedImage from "../Feeds/FeedImage.js";
import FeedInfo from "../Feeds/FeedInfo.js";
import FeedContent from "../Feeds/FeedContent.js";
import FeedActions from "../FeadActions/FeedActions.js";

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

          <FeedActions feedId={feedId} />
        </div>
      </div>
    </Link>
  );
};

export default Feed;
