import { useContext } from "react";
import { Link } from "react-router-dom";
import FeedContent from "../components/Feeds/FeedContent";
import FeedImage from "../components/Feeds/FeedImage";
import FeedInfo from "../components/Feeds/FeedInfo";
import { AuthContext } from "../context/AuthContext";
import { GetAllFeedsBookmark } from "../services/fetch";
import FeedActions from "../components/FeadActions/FeedActions";

const FeedBookmark = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, data, error } = GetAllFeedsBookmark(
    "bookmark",
    currentUser.id
  );

  return (
    <div className="bookmark">
      <p className="bookmarHeader">
        Bookmark For <span>{currentUser.name}</span>
      </p>
      <div className="container">
        <div className="bookmark-left"></div>
        <div className="bookmark-right">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Somthing went wrong</p>
          ) : data.length < 1 ? (
            <p>You don't have bookmark !</p>
          ) : (
            data.map((bookmark, index) => {
              return (
                <Link
                  to={`/feeds/${bookmark.title}/${bookmark.feedId}`}
                  className="link"
                  key={index}
                >
                  <div className="feed">
                    <FeedImage image={bookmark.image} />

                    <div className="feedContent">
                      <FeedInfo
                        avatar={bookmark.avatar}
                        author={bookmark.author}
                        name={bookmark.name}
                        createdFeed={bookmark.feedCreated}
                      />

                      <FeedContent
                        title={bookmark.title}
                        content={bookmark.content}
                      />

                      <FeedActions feedId={bookmark.feedId} />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedBookmark;
