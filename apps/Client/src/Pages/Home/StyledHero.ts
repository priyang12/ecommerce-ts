import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const StyledHeroContainer = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  padding: 2rem;
  background-color: var(--primary-300);
  box-sizing: border-box;
  width: 100%;
  height: 90vh;

  ${media.mobile} {
    width: 100%;
    flex-direction: column;
  }
  ${media.tablet} {
    width: 100%;
    flex-direction: column;
  }
`;

export const StyledHero = styled.div`
  margin: 1em;

  h1 {
    font-size: 4.5rem;
    font-size: 4.5rem;
    line-height: 1.2;
    margin-bottom: 0.5em;
    font-weight: bold;
    color: var(--text-primary);
  }
  p {
    font-size: 1.25rem;
    margin-bottom: 1.5em;
    color: var(--text-secondary);
  }

  a {
    display: inline-block;
    background-color: var(--primary-500);
    color: var(--text-secondary);
    border: 2px solid;

    text-decoration: none;
    padding: 0.75em 1.5em;
    border-radius: 4px;
    font-weight: 600;
    margin-bottom: 2em;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--primary-700);
      border: 2px solid var(--secondary-300);
    }
  }

  ul {
    display: inline-flex;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin-top: 1em;

    li {
      font-size: 1rem;
      margin-bottom: 0.5em;
      color: var(--text-primary);
    }
  }
`;

export const StyledHeroImgContainer = styled.div`
  margin: 1em;
`;
