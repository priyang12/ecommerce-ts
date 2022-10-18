import styled from "styled-components";
import { media } from "../../Variables";

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  color: var(--bg-color);
  font-size: 1.5rem;
  font-weight: bold;
  gap: 1rem;
  font-family: "Roboto", sans-serif;
  margin: 1em 0;
  padding: 1em;
  p {
    margin: 0;
  }
  h4 {
    margin: 0;
  }
  ${media.tablet} {
    font-size: 1.2rem;
    flex-direction: column;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em 1.5em;
  width: 100%;
  height: 100%;
  gap: 1rem;
  ${media.tablet} {
    flex-direction: row;
    padding: 0;
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

  ${media.tablet} {
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
