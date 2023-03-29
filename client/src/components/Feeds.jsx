import Feed from "./Feed";
import { GetAllFeeds } from "../services/fetch";

const Feeds = () => {
  const { isLoading, data, error } = GetAllFeeds("feeds")

  return (
    <div className="feeds">
      {isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Somethings went wrong ...</p>
      ) : (
        data.map((feed) => {
          return <Feed key={feed.feedId} feed={feed} />;
        })
      )}
    </div>
  );
};

export default Feeds;
