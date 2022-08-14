import styled from "styled-components";

export const StyledErrorCatch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80")
    repeat center/cover;
  height: 100vh;
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
  width: 50%;
  @media (min-width: 768px) {
    font-size: 2rem;
    padding: 1rem;
  }
`;

export const StyledErrorCatchMessage = styled.p`
  width: 50%;
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  backdrop-filter: blur(11px) saturate(200%);
  -webkit-backdrop-filter: blur(11px) saturate(200%);
  background-color: rgba(29, 42, 62, 0.47);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;
