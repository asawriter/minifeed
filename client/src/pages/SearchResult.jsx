import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { Link } from "react-router-dom";
import FeedImage from "../components/Feeds/FeedImage";
import FeedContent from "../components/Feeds/FeedContent";
import FeedInfo from "../components/Feeds/FeedInfo";
import FeedActions from "../components/FeadActions/FeedActions";

const SearchResult = () => {
  const { searchResult, searchValue } = useContext(SearchContext);

  return (
    <div className="searchResult">
      <p className="searchHeader">Search for <span>{searchValue}</span></p>
      <div className="container">
        <div className="search-left"></div>

        <div className="search-right">
          {searchResult?.length < 1 ? (
            <h1>
              No result for
              <span style={{ fontSize: "18px" }}>{searchValue}</span>
            </h1>
          ) : (
            searchResult?.map((s, index) => (
              <Link
                to={`/feeds/${s.title}/${s.feedId}`}
                className="link"
                key={index}
              >
                <div className="feed">
                  <FeedImage image={s.image} />

                  <div className="feedContent">
                    <FeedInfo
                      avatar={s.avatar}
                      author={s.author}
                      name={s.name}
                      createdFeed={s.feedCreated}
                    />

                    <FeedContent title={s.title} content={s.content} />

                    <FeedActions feedId={s.feedId} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
