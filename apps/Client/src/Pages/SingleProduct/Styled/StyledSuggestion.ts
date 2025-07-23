import { styled } from "@linaria/react";
import { media } from "../../../Utils/Variables";
import { StyledContainer } from "./StyledSingleProduct";

export const StyleSuggestion = styled(StyledContainer)`
  h1,
  h2,
  h3 {
    margin-bottom: 1rem;
  }

  ${media.mobile} {
    h1,
    h2,
    h3 {
      text-align: center;
      font-size: 1.25rem;
    }
  }
`;

export const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  background-color: var(--bg-surface);
  border: 1px solid var(--primary-600);
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const StyledProductItem = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5em;
  border: 1px solid var(--bg-contrast-color);
  border-radius: var(--border-radius);
  background-color: var(--surface-elevation-low);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover,
  &:focus {
    transform: scale(1.02);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid var(--primary-500);
  }

  h3 {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 1.1rem;
  }

  ${media.mobile} {
    &:hover,
    &:focus {
      transform: scale(1);
    }

    h3 {
      font-size: 1rem;
    }
  }
`;

export const StyledRating = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;
