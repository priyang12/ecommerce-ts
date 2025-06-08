import styled from "styled-components";
import { media } from "../../Utils/Variables";

export const StyledNavbar = styled.nav`
  color: var(--primary-dark-color);
  background-color: var(--primary-light-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    margin: 0;
  }
  ${media.LargerThanTablet} {
    flex-direction: row;
  }
`;

export const StyledSkipNav = styled.a`
  z-index: -1;
  &:focus {
    z-index: 1;
    display: block;
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
  ${media.mobile} {
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

export const StyledLinks = styled.div`
  text-align: center;
  margin-right: 1em;
  a {
    color: var(--bg-contrast-color);
    &:hover {
      color: #fff;
    }
  }
`;
export const DropDown = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .dropdown-content {
    display: none;
    position: absolute;
    text-align: center;
    top: 90%;
    right: 0%;
    padding: 0rem;
    background-color: var(--assertive-color);
    min-width: fit-content;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 2020;
    border-radius: 20px;
    width: fit-content;
    li {
      width: fit-content;
      padding: 0.5rem 2rem;
      border-bottom: 2px solid var(--primary-color);
      border-radius: 20px;
      a {
        color: var(--secondary-color);
      }
    }
  }
`;

export const StyledDropDownButton = styled.button`
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0rem 0.5rem;
  background-color: transparent;
  color: var(--bg-contrast-color);
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
export const StyledUserName = styled.div`
  color: var(--bg-contrast-color);
  font-size: 1.2rem;
  margin: 0;
`;
