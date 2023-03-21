import Feed from "./Feed";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";

const Feeds = () => {
  const { isLoading, data, error } = useQuery(["feeds"], () =>
    makeRequest.get("/feeds").then((res) => res.data?.feeds));

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
