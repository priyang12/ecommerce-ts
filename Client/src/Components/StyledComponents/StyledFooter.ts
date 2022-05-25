import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  background-color: #c996cc;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  gap: 1rem;
  font-family: "Roboto", sans-serif;
  margin: 1rem 0;
  padding: 1em;
  p {
    margin: 0;
  }
  h4 {
    margin: 0;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
    flex-direction: column;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const ContentInfo = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  list-style: none;
  li {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const ContactInfo = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  list-style: none;
  li {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
  }
`;
