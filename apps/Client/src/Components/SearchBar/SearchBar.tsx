import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchBarContainer,
  SerachInput,
  SerachButton,
} from "./StyledSearchbar";

function SearchBar() {
  const Navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const search = () => {
    if (searchValue !== "") {
      const path = `/search/name=${searchValue}`;
      Navigate(path);
    }
  };

  return (
    <SearchBarContainer>
      <SerachInput
        type="text"
        placeholder="Search Product"
        name="search"
        onKeyUp={(e: any) => {
          setSearchValue(e.target.value);
          if (e.key === "Enter") {
            search();
          }
        }}
      />
      <SerachButton onClick={search}>Find</SerachButton>
    </SearchBarContainer>
  );
}

export default SearchBar;
