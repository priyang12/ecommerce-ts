import styled from "styled-components";
import { CardBoard, Card } from "./CardBoard";

export const StyledDisplay = styled.section`
  text-align: center;
  background-color: #774bac;
  /* background: url('../images/circle-scatter-haikei.svg') repeat center/cover; */
  height: 100vh;
  min-height: 1500px;
  color: #fff;
  margin: 0;
  h1 {
    font-family: cursive;
    margin: 0;
    font-size: clamp(1.913rem, calc(12px + 2.475vw), 2.587rem);
    padding: 1em;
  }
`;

// export const StyledProducts = styled.section`
export const StyledProducts = styled(CardBoard)`
  display: grid;
  width: 100%;
  margin: auto;
  padding: 1em;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  grid-template-rows: 1fr;
  gap: 2rem;
  backdrop-filter: blur(8px) saturate(142%);
  -webkit-backdrop-filter: blur(8px) saturate(142%);
  background-color: #040202a3;
  border: 1px solid rgba(255, 255, 255, 0.125);
  max-width: 90%;
  width: 90%;
`;

/* export const StyledProductCard = styled.div` */
export const StyledProductCard = styled(Card)`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
  transition: 0.8s all ease;
  border-radius: 10px;
  color: #412043;
  background-color: #e3c9e5;
  a {
    color: #412043;
    font-size: 1.5rem;
  }
  .CardTitle {
    overflow: hidden;
    max-height: 2rem;
  }
  &:hover {
    box-shadow: 0px 8px 16px #916bbf;
  }
`;

export const StyledRating = styled.div``;
