import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--bg-surface);
  color: var(--text-primary);
  top: 0;
  padding: 1em;
  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  h1 {
    font-size: 2rem;
    color: var(--text-primary);
    margin: 0;
  }
  img {
    width: 30%;
    height: auto;
  }
`;

export const StyledSkipNav = styled.a`
  position: absolute;
  left: -999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;

  &:focus {
    position: static;
    width: auto;
    height: auto;
    z-index: 1000;
    padding: 0.5rem 1rem;
    background-color: var(--primary-500);
    color: var(--text-primary);
  }
`;

export const StyledSecondaryNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  ${media.mobile} {
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    padding-top: 1rem;
  }
`;

export const StyledLinks = styled.div`
  a {
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.3s;
    &:hover {
      color: var(--primary-color);
    }
  }
`;
