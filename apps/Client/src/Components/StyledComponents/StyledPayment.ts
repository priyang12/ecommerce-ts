import styled from "styled-components";
import { media } from "../../Utils/Variables";

export const StyledPaymentContainer = styled.section`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth || "60ch"};
  margin: 2em auto;
  @media (max-width: 576px) {
    max-width: 35ch;
  }
  ${media.tablet} {
    max-width: 50ch;
  }
`;

export const LinkContainer = styled.ul`
  padding-left: 0%;
  background-color: #000;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  border: 2px solid rgba(255, 255, 255, 0.125);
  padding: 2rem;
  border-radius: 15px;
  font-size: 1.5rem;
  a {
    color: var(--secondary-color);
  }
`;
