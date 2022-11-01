import styled from "styled-components";
import { media } from "../../../Variables";
import { StyledContainer } from "./StyledSingleProduct";

export const StyleSuggestion = styled(StyledContainer)`
  ${media.mobile} {
    h1,
    h2,
    h3,
    h3 {
      text-align: center;
    }
  }
`;

export const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  border: 2px solid var(--assertive-color);
  border-radius: var(--border-radius);
  backdrop-filter: blur(8px) saturate(142%);
  -webkit-backdrop-filter: blur(8px) saturate(142%);
  background-color: var(--bg-color-alpha);
  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const StyledProductItem = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.2em;
  transform: scaleX(0.8) scaleY(0.8);
  transition: transform 0.5s ease;
  border: 2px solid var(--bg-contrast-color);
  &:hover,
  &:focus {
    transform: scaleX(1.1) scaleY(1.1);
  }
  &:focus {
    outline: 2px solid var(--bg-contrast-color);
    border-radius: var(--border-radius);
  }
  h3 {
    text-align: center;
  }
  ${media.mobile} {
    &:hover,
    &:focus {
      transform: scaleX(0.9) scaleY(0.9);
    }
  }
`;

export const StyledRating = styled.span`
  span {
    display: flex;
    padding: 0.1em;
    justify-content: center;
  }
`;
