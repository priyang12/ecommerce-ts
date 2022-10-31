import styled from "styled-components";
import { media } from "../../Variables";

export const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  border: 2px solid var(--bg-contrast-color);
  border-radius: var(--border-radius);
  padding: 2em;
  p {
    color: var(--bg-contrast-color);
    span {
      color: var(--primary-color);
    }
  }
  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const ReviewOrder = styled.div`
  display: flex;
  flex-direction: column;
  .btn {
    display: flex;
    margin: 0;
  }
`;

export const ReviewProduct = styled.div`
  p {
    color: var(--bg-contrast-color);
    a {
      color: red;
      text-decoration: revert;
    }
  }
`;

export const UserReview = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
  #rating {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

export const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    border-radius: 1em;
  }
`;
