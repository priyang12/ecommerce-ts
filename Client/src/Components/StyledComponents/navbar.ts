import styled from "styled-components";

export const StyledNavbar = styled.nav`
  color: #c996cc;
  background-color: #916bbf;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    margin: 0;
  }
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

export const StyledSecondaryNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & > * {
    margin: 0.5em;
    padding: 2em;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    & > * {
      padding: 0.5em;
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 3rem;
    color: white;
  }
  img {
    width: 30%;
  }
`;
export const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`;

export const SerchButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1.5rem;
  margin-left: 1rem;
  box-shadow: none;
  color: var(--assertive-color);
`;
export const SerachInput = styled.input`
  color: white;
  padding: 0.7em;
  font-size: 1.1rem;
  background-color: var(--secondary-color);

  &:hover,
  &:focus {
    color: var(--secondary-color);
    background-color: var(--main-dark-color);
    outline: none;
  }
`;

export const StyledLinks = styled.div`
  text-align: center;
  margin-right: 1em;
  a {
    color: var(--secondary-color);
    &:hover {
      color: #fff;
    }
  }
  @media (max-width: 800px) {
  }
`;
export const DropDown = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--secondary-light-color);
  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    right: 0%;
    padding: 0rem;
    background-color: var(--assertive-color);
    min-width: fit-content;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 20px;
    li {
      width: fit-content;
      padding: 0.5rem 2rem;
      border-bottom: 2px solid var(--main-color);
      border-radius: 20px;
      a {
        color: var(--secondary-color);
      }
    }
    @media (max-width: 576px) {
      top: 50%;
      left: 0%;
    }
  }
`;

export const StyledDropDownButton = styled.button`
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0rem 0.5rem;
  background-color: transparent;
  color: var(--seccondary-color);
  border-radius: 50%;
  border-color: var(--seccondary-color);
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--assertive-color);
  }
  &:focus ~ .dropdown-content,
  & ~ .dropdown-content:hover {
    display: block;
  }
`;
