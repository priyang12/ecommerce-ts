import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const StyledReviewsContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledReviewsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledReviewContainer = styled.div`
  margin: 5%;
  padding: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  border: 2px solid var(--primary-500);
  border-radius: var(--border-radius);

  h3 {
    color: var(--primary-300);
  }

  p {
    color: var(--secondary-300);
    span {
      color: var(--text-primary);
    }
  }
  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const StyledReviewOrder = styled.div`
  display: flex;
  flex-direction: column;

  .btn {
    display: flex;
    margin: 0;
  }
`;

export const StyledReviewProduct = styled.div`
  p {
    color: var(--bg-contrast-color);
    a {
      color: red;
      text-decoration: revert;
    }
  }
`;

export const StyledUserReview = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const StyledImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    border-radius: 1em;
  }
`;
