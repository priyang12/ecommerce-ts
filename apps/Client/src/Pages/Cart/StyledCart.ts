import styled from "styled-components";
import { media } from "../../Variables";

export const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  min-height: 80vh;

  h1 {
    text-align: center;
    margin-left: 1em;
    font-size: 2.5rem;
  }
  ${media.tablet} {
    width: 90%;
    h1 {
      font-size: 3rem;
    }
  }

  ${media.LargerThanLaptop} {
    h1 {
      font-size: 4rem;
      text-align: start;
    }
  }
`;

export const StyledCartContainer = styled.div`
  display: flex;
  ${media.laptop} {
    flex-direction: column;
  }
`;

export const StyledCart = styled.div`
  width: 100%;
  padding: 0 1rem;
  width: 70%;
  height: 100%;
  margin: 0 auto;
  ${media.tablet} {
    width: 100%;
  }
`;

export const StyledCheckout = styled.div`
  width: 100%;
  background-color: var(--secondary-light-color);
  max-width: 50ch;
  padding: 1em;
  color: var(--assertive-color);
  border-radius: var(--border-radius);
  margin: auto;
  p {
    font-size: 1.5rem;
    background-color: var(--primary-light-color);
    padding: 0.5em;
  }
  .btn {
    margin: 0;
    border-radius: var(--border-radius);
    border: 2px solid var(--primary-dark-color);
    transition: all 0.3s ease-in-out;
  }
`;

export const StyledCartCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
  padding: 1rem;
  gap: 1rem;
  margin-bottom: 1rem;
  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledCartImageContainer = styled.div`
  width: 40vw;
  height: 250px;
  padding: 0.5em;
  img {
    border-radius: 10px;
    width: 40ch;
    height: 100%;
    object-fit: cover;
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
