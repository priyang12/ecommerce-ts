import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchBarContainer,
  SearchButton,
  SearchInput,
} from "./StyledSearchbox";

/**
 * SearchBar component for product search functionality.
 *
 * @component
 * @param {Object} props
 * @param {string} props.searchedValue - Initial value for the search input.
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 */
function SearchBar({ searchedValue }: { searchedValue: string }) {
  const Navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  /**
   * Navigates to the search results page or homepage depending on input value.
   */
  const search = () => {
    if (searchValue !== "") {
      const path = `/search/${searchValue}`;
      Navigate(path);
    } else {
      Navigate("/");
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        aria-label="Search Product"
        placeholder="Search Product"
        name="search"
        defaultValue={searchedValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
      />
      <SearchButton onClick={search}>Find</SearchButton>
    </SearchBarContainer>
  );
}

export default SearchBar;
