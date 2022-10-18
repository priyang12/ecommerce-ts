import styled from "styled-components";

export const StyledContainer = styled.div`
  max-width: 100ch;
  margin: 0 auto;
  width: 100%;
  min-height: 80vh;
  h1 {
    text-align: center;
    font-size: 4.5rem;
  }
`;

export const StyledCheckout = styled.div`
  background-color: var(--secondary-light-color);
  max-width: 30ch;
  width: 100%;
  margin: 1em auto;
  padding: 1em;
  color: var(--assertive-color);
  p {
    font-size: 1.5rem;
    background-color: var(--primary-light-color);
    padding: 0.5em;
  }
  .btn {
    margin: 0;
    border: 2px solid var(--primary-dark-color);
    transition: all 0.3s ease-in-out;
  }
`;
