import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c996cc;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  gap: 1rem;
  font-family: "Roboto", sans-serif;
  p {
    margin: 0;
    width: 50%;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
