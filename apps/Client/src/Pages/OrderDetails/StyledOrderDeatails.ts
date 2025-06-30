import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";
import { css } from "@linaria/core";

export const StyledOrderItems = styled.div`
  background-color: var(--bg-default);
  h3 {
    font-size: 2.5rem;
    text-align: center;
  }
`;

export const StyledOrderList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  ${media.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const StyledListItems = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--primary-300);
  border-radius: 0.5rem;
  padding: 1em;

  a {
    color: var(--primary-500);
    text-decoration: none;
    font-size: 1.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  p {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    margin: 0;
  }
  transition: all 0.2s ease-in-out;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    outline: 5px solid var(--bg-contrast);
    border: 2px solid var(--bg-surface);
  }
  ${media.mobile} {
    width: 80%;
    margin: auto;
  }
`;

export const StyledImageContainer = styled.div`
  height: 40vh;
  img {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
  }
  ${media.mobile} {
    width: 100%;
    height: 100%;
    margin: auto;
  }
  ${media.LargerThanLaptop} {
    width: 20vw;
  }
`;

export const StyledOrderDetails = styled.div`
  font-size: 1.5rem;
  color: var(--primary-text);
  background-color: var(--bg-surface);
  padding: 1em;
  border-radius: 5px;
  margin: 1em 0;
  h1 {
    color: var(--primary-400);
  }
  h2 {
    color: var(--secondary-400);
  }
  h3 {
    margin: 1em 0;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    li {
      display: flex;
      justify-content: space-between;
    }
  }
  & > p {
    margin: 0;
  }
`;

export const StyledDelivery = styled.p`
  font-size: 2rem;
  text-align: center;
  background-color: #fff;
  padding: 1em;
  border-radius: var(--border-radius);
`;

export const deliveryDone = css`
  border: 2px solid var(--success);
  color: var(--success);
  background-color: rgba(0, 255, 0, 0.1);
`;
export const deliveryNotDone = css`
  border: 2px solid var(--error);
  color: var(--error);
  background-color: rgba(255, 0, 0, 0.1);
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

export const ReviewButton = styled.button`
  margin: 0;
  border: 2px solid var(--bg-contrast);
  border-radius: var(--border-radius);
  height: 5rem;
  background-color: var(--secondary-200);
  cursor: pointer;
`;
