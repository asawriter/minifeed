import { BiSearch } from "react-icons/bi";
import { SearchFeedByTitle } from "../services/fetch/loadFeeds";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const SearchBar = () => {
  const { searchValue, setSearchValue, setSearchResult } =
    useContext(SearchContext);

  const { isLoading, data, error } = SearchFeedByTitle("searchs", searchValue);

  const handleSearch = () => {
    setSearchResult(data);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Search MiniFeed"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Link className="link" to={`/feeds/search?title=${searchValue}`}>
        <BiSearch
          style={{ fontSize: "20px", marginRight: "8px" }}
          onClick={handleSearch}
        />
      </Link>
    </div>
  );
};

export default SearchBar;
