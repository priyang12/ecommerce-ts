import styled from "styled-components";

export const StyledErrorCatch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5b0;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  overflow: auto;
  @media (min-width: 768px) {
    font-size: 2rem;
    padding: 1rem;
  }
`;

export const StyledErrorCatchTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const StyledButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 0.5rem;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0.5rem;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 2rem;
    padding: 1rem;
  }
`;
