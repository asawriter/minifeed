import { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  return (
    <SearchContext.Provider value={{ searchValue, searchResult, setSearchValue, setSearchResult }}>
      {children}
    </SearchContext.Provider>
  );
};
