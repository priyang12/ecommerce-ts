import styled from "styled-components";

export const StyledNavbar = styled.nav`
  color: #c996cc;
  background-color: #916bbf;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const Logo = styled.div`
  h1 {
    font-size: 3rem;
    color: white;
  }

  text-align: center;
`;
export const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`;

export const SerchButton = styled.button`
  border: none;
  margin-left: 1rem;
  box-shadow: none;
  color: white;
`;
export const SerachInput = styled.input`
  color: white;
  padding: 0.7em;
  font-size: 1.1rem;
  background-color: $secondarycolor;
  &:hover,
  &:focus {
    color: $secondarycolor;
    background-color: darken($color: $PrimaryColor, $amount: 10);
    outline: none;
  }
`;

export const StyledLinks = styled.div`
  text-align: center;
  margin-right: 1em;
  a {
    color: $secondarycolor;
    &:hover {
      color: lighten($color: $secondarycolor, $amount: 50);
    }
  }
`;
export const DropDown = styled.div`
  position: relative;
  padding-right: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: lighten($color: $secondarycolor, $amount: 30);
  .dropdown-content {
    display: none;
    position: absolute;
    top: 50%;
    right: 20%;
    padding: 0rem;
    background-color: lighten($color: $PrimaryColor, $amount: 10);
    min-width: fit-content;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 20px;
    li {
      width: fit-content;
      padding: 0.5rem 2rem;
      border-bottom: 2px solid $PrimaryColor;
      border-radius: 20px;
      a {
        color: lighten($color: $secondarycolor, $amount: 20);
      }
    }
  }
  button {
    cursor: pointer;
    margin: 0rem 0.5rem;
    background-color: transparent;
    color: $secondarycolor;
    border: none;
    &:focus ~ .dropdown-content,
    & ~ .dropdown-content:hover {
      display: block;
    }
  }
`;
