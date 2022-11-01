import styled from "styled-components";
import { CardBoard, Card } from "./CardBoard";

export const StyledDisplay = styled.section`
  text-align: center;
  color: var(--primary-light-color);
  background-color: var(--primary-dark-color);
  background: url("./images/haikei.svg") repeat center/cover;
  margin: 0;
  min-height: 1000px;
  h1 {
    margin: 0;
    font-size: clamp(1.913rem, calc(12px + 2.475vw), 2.587rem);
    padding: 1em;
  }
`;

// export const StyledProducts = styled.section`
export const StyledProducts = styled(CardBoard)`
  backdrop-filter: blur(8px) saturate(142%);
  -webkit-backdrop-filter: blur(8px) saturate(142%);
  background-color: var(--bg-color-alpha);
  border: 1px solid rgba(255, 255, 255, 0.125);
  max-width: 80%;
  width: 100%;
`;

export const StyledProductPrice = styled.h2`
  font-size: clamp(1.913rem, calc(12px + 2.475vw), 2.587rem);
  font-family: cursive;
  margin: 0;
  padding: 1em;
`;

/* export const StyledProductCard = styled.div` */
export const StyledProductCard = styled(Card)`
  cursor: pointer;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
  transition: 0.8s all ease;
  border-radius: 10px;
  color: var(--bg-color);
  background-color: var(--secondary-light-color);
  a {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  .CardTitle {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-height: 2rem;
  }
  &:hover {
    box-shadow: 0px 8px 16px #7f0e7f;
  }
  @media (prefers-color-scheme: dark) {
    &:hover {
      box-shadow: 0px 8px 16px #fff;
    }
  }
`;

export const StyledRating = styled.span`
  padding: 0.5rem;
  font-size: 1.5rem;
`;
