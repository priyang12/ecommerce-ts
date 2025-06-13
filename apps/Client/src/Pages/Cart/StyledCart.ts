import styled from "styled-components";
import { media } from "../../Utils/Variables";

export const StyledContainer = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;

  h1 {
    font-size: 2.5rem;
  }
  ${media.tablet} {
    width: 90%;
    h1 {
      font-size: 3rem;
      text-align: center;
    }
  }
`;

export const StyledCartContainer = styled.div`
  display: flex;
  gap: 1rem;
  ${media.tablet} {
    flex-direction: column;
  }
`;

export const StyledCheckout = styled.div`
  margin: auto;
  background-color: var(--secondary-light-color);
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--assertive-color);
  border-radius: var(--border-radius);

  p {
    font-size: 1.5rem;
    background-color: var(--primary-light-color);
    padding: 0.5em;
    border: 3px solid var(--bg-color);
    border-radius: var(--border-radius);
  }
  .btn {
    margin: 0;
    border-radius: var(--border-radius);
    border: 2px solid var(--primary-dark-color);
    transition: all 0.3s ease-in-out;
  }
  ${media.LargerThanTablet} {
    width: 100%;
  }
`;

export const StyledCartCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: baseline;
  justify-content: space-between;
  height: 100%;
  border: 2px solid white;
  border-radius: 5px;
  padding: 1rem;
  gap: 1rem;
  margin-bottom: 1rem;
  ${media.mobile} {
    padding: 0.5em;
    grid-template-columns: 1fr;
    select {
      width: 80%;
    }
  }
`;

export const StyledCartImageContainer = styled.div`
  width: 40vw;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  img {
    border-radius: 10px;
    width: 40ch;
    height: 100%;
    object-fit: cover;
    ${media.tablet} {
      width: 100%;
    }
  }
  ${media.tablet} {
    width: 100%;
  }
`;

export const StyledCartInfoContainer = styled.div`
  width: 30ch;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: start;
  gap: 1rem;
  ${media.tablet} {
    align-items: flex-start;
    width: 100%;
  }
`;

export const StyledCartInfo = styled.ul`
  margin: 0;
  width: 100%;
  li {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 500;
  }
  .ProductName {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    a {
      height: 50px;
      color: var(--primary-dark-color);
    }
    ${media.tablet} {
      white-space: normal;
    }
  }
  .price {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--primary-dark-color);
  }
`;

export const StyledTotalPrice = styled.div`
  width: 30ch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: start;
  gap: 1rem;
  span {
    text-align: end;
    font-size: 1.5rem;
  }
`;

export const IconButton = styled.button`
  background-color: transparent;
  color: var(--primary-color);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
  svg {
    font-size: 2rem;
    margin-right: 0.5em;
  }
  &:hover {
    color: var(--primary-dark-color);
    transform: scale(1.1);
  }
`;

export const StyledWishlistProduct = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1em;
  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const StyledWishlistItem = styled.div`
  p {
    color: var(--bg-contrast-color);
  }
  p:first-child {
    font-size: 1.5rem;
  }
`;
