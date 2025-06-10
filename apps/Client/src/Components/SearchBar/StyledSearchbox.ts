import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const SearchBarContainer = styled.div`
  position: sticky;
  top: 0%;
  left: 0%;
  display: flex;
  justify-content: center;
  margin-top: 1em;
  border-radius: 15px;
  padding: 1em 0;
  margin: 1em;
  z-index: 10;
  background-color: var(--secondary-light-color);
  ${media.tablet} {
    font-size: 1rem;
  }
`;

export const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  width: 20%;
  border-radius: 10px;
  font-size: 1.5rem;
  margin-left: 1rem;
  box-shadow: none;
  color: var(--assertive-color);
  transition: all 0.3s ease-in-out;
  border: 2px solid var(--assertive-color);
  &:hover {
    color: var(--primary-color);
    background-color: var(--assertive-color);
  }
  &:focus {
    outline: none;
    border: 5px solid var(--assertive-color);
  }
  ${media.tablet} {
    font-size: 1rem;
  }
`;

export const SearchInput = styled.input`
  color: var(--bg-contrast-color);
  padding: 0.7em;
  font-size: 1.1rem;
  width: 60%;
  border-radius: 10px;
  background-color: var(--secondary-color);
  border: 1px solid var(--assertive-color);
  transition: border 0.3s ease-in-out;
  ::placeholder {
    color: var(--bg-contrast-color);
    opacity: 0.5;
  }
  &:hover,
  &:focus {
    background-color: var(--primary-dark-color);
    outline: none;
    border: 5px solid var(--assertive-color);
  }
  ${media.tablet} {
    width: 50%;
    font-size: 1rem;
  }
`;
