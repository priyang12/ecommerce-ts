import styled from "styled-components";
import { media } from "../../Variables";

export const OrderLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${media.tablet} {
    gap: 3rem;
  }
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--assertive-color);
  color: var(--bg-contrast-color);
  border-radius: var(--border-radius);
  margin: 0.5rem auto;
  p {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid #fff;
    padding: 1em;
  }
  a {
    color: var(--bg-color);
  }
  ${media.LargerThanLaptop} {
    & :nth-child(1) {
      min-width: 300px;
    }
    & :nth-child(3) {
      min-width: 60px;
    }
  }
  ${media.tablet} {
    flex-direction: row;
  }
  ${media.mobile} {
    width: 80%;
    flex-wrap: wrap;
    p {
      border: 0;
    }
    & > * {
      margin-bottom: 1rem;
    }
  }
`;
