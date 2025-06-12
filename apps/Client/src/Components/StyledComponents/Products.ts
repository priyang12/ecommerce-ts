import styled from "styled-components";
import { CardBoard, Card } from "./CardBoard";

export const StyledDisplay = styled.section`
  text-align: center;
  color: var(--primary-light-color);
  background-color: var(--primary-dark-color);
  background: url("./images/haikei.svg") repeat center/cover;
  margin: 0;
  min-height: 1000px;
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
