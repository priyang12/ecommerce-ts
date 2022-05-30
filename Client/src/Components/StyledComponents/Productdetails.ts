import styled from "styled-components";

export const StyledContainer = styled.section`
  max-width: 120ch;
  width: 100%;
  min-height: 100vh;
  margin: 2rem auto;
`;

export const StyledProduct = styled.div`
  color: var(--secondary-light-color);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;

  img {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 100px) and (max-width: 500px) and (orientation: portrait) {
    width: 90%;
    margin: auto;
    grid-template-columns: 1fr;
  }
  @media (min-width: 500px) and (max-width: 799px) {
    grid-template-columns: 1fr 2fr;
  }
`;

export const StyledDetails = styled.div`
  backdrop-filter: blur(8px) saturate(184%);
  -webkit-backdrop-filter: blur(8px) saturate(184%);
  background-color: rgba(163, 172, 191, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 1em;
  color: #fff;
  h2 {
    margin: 0;
  }
`;
export const StyledCheckout = styled.div`
  padding: 2rem;
  background-color: var(--main-dark-color);
  border: 1px solid #fff;
  .status-label {
    border-bottom: 2px solid #fff;
  }
  @media (min-width: 500px) and (max-width: 799px) {
    grid-column: 1 / span 2;
  }
`;
