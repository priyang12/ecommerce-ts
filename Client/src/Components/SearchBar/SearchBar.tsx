import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  SearchBarContainer,
  SerachInput,
  SerachButton,
} from "./StyledSearchbar";

function SearchBar() {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState<string>("");

  const search = () => {
    if (searchValue !== "") {
      let path = `/search/name=${searchValue}`;
      history.push(path);
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
