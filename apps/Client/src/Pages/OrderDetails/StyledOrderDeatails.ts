import styled from "styled-components";
import { media } from "../../Variables";

export const StyledOrderItems = styled.div`
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
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
  padding: 1em;

  a {
    color: var(--primary-color);
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
    outline: 5px solid var(--bg-contrast-color);
    border: 2px solid var(--bg-color);
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
  color: var(--secondary-light-color);
  background-color: var(--assertive-color);
  padding: 1em;
  border-radius: 5px;
  margin: 1em 0;
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
  border: 2px solid ${(props) => props.theme.color};
  border-radius: var(--border-radius);
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

export const ReviewButton = styled.button`
  margin: 0;
  border: 2px solid var(--bg-contrast-color);
  border-radius: var(--border-radius);
  height: 5rem;
`;
