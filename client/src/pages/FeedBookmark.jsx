import { useContext } from "react";
import { Link } from "react-router-dom";
import FeedActions from "../components/Feed/FeedActions";
import FeedContent from "../components/Feed/FeedContent";
import FeedImage from "../components/Feed/FeedImage";
import FeedInfo from "../components/Feed/FeedInfo";
import { AuthContext } from "../context/AuthContext";
import { GetAllFeedsBookmark } from "../services/fetch";

const FeedBookmark = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, data, error } = GetAllFeedsBookmark(
    "bookmark",
    currentUser.id
  );

  console.log(data);

  return (
    <div className="bookmark">
      <h1>Bookmark For {currentUser.name}</h1>
      <div className="container">
        <div className="bookmark-left">left</div>
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
