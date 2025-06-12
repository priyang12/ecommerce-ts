import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { media } from "../../../Utils/Variables";

export const StyledContainer = styled.section`
  max-width: 120ch;
  width: 100%;
  margin: 2rem auto;
`;

export const StyledProduct = styled.div`
  color: var(--secondary-light-color);
  display: grid;
  gap: 1.5rem;
  margin: 5%;
  grid-template-columns: 2fr 2fr 1fr;
  grid-template-areas:
    "image image ."
    "image image ."
    ". details details"
    ". details details"
    "checkout quantity quantity";

  ${media.laptop} {
    grid-template-columns: 2fr 2fr;
    grid-template-areas:
      "image details"
      ". details"
      ". details"
      "checkout quantity";
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "image"
      "details"
      "checkout"
      "quantity";
  }
`;

export const StyledImageContainer = styled.div`
  grid-area: image;
  width: 100%;
  img {
    width: 100%;
    border-radius: 1.5rem;
  }
`;

export const StyledDetails = styled.div`
  grid-area: details;
  background-color: var(--bg-surface);
  border-radius: 2%;
  padding: 0 1em;
  box-sizing: border-box;
  h1 {
    color: var(--text-primary);
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  .star-review {
    margin: 1rem 0;
    display: flex;
    justify-content: flex-start;
    .stars {
      font-size: 1.2rem;
    }
  }
  .Description {
    font-size: 1.1rem;
    span {
      font-weight: 400;
      color: var(--text-secondary);
    }
  }
  .highlight {
    color: var(--primary-500);
  }
`;

export const StyledCheckout = styled.div`
  grid-area: checkout;
  padding: 1em;
  background-color: var(--bg-surface);
  border: 1px solid #fff;
  .status-label {
    padding-bottom: 1em;
    border-bottom: 2px solid var(--bg-contrast);
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--primary-500);
  }
`;

export const StyledQuantity = styled.div`
  grid-area: quantity;
  width: 80%;
  margin: auto;
  label {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  select {
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

export const outOfStock = css`
  color: var(--error);
  font-weight: bold;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--error);
  border-radius: 4px;
  width: fit-content;
  margin-top: 0.5rem;
`;

export const haveOfStock = css`
  color: var(--success);
  font-weight: bold;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--success);
  border-radius: 4px;
  width: fit-content;
  margin-top: 0.5rem;
`;

export const StyledLoginButton = styled.button`
  background-color: var(--primary-500);
  color: white;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--primary-600);
  }
`;

export const cartButton = css`
  composes: ${StyledLoginButton};
  background-color: var(--primary-500);
  color: white;

  &:hover {
    background-color: var(--primary-600);
  }
`;

export const wishlistButton = css`
  composes: ${StyledLoginButton};
  background-color: #626d78;
  color: white;

  &:hover {
    background-color: #505a63;
  }
`;
