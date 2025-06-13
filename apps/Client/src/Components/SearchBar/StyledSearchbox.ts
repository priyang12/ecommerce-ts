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
  background-color: var(--bg-surface);
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
  color: var(--primary-600);
  border: 2px solid var(--primary-600);
  transition: all 0.3s ease-in-out;
  &:hover {
    color: var(--primary-100);
    background-color: var(--primary-600);
  }
  &:focus {
    border: 5px solid var(--primary-800);
  }
  ${media.tablet} {
    font-size: 1rem;
  }
`;

export const SearchInput = styled.input`
  color: var(--text-primary);
  padding: 0.7em;
  font-size: 1.1rem;
  width: 60%;
  border-radius: 10px;
  background-color: var(--neutral-700);
  border: 1px solid var(--primary-300);
  transition: border 0.3s ease-in-out;
  ::placeholder {
    color: var(--text-primary);
    opacity: 0.5;
  }
  &:hover,
  &:focus {
    outline: none;
    background-color: var(--bg-surface);
  }
  ${media.tablet} {
    width: 50%;
    font-size: 1rem;
  }
`;
