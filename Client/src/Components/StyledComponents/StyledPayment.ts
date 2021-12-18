import styled from "styled-components";

export const StyledPaymentContainer = styled.section`
  width: 100%;
  max-width: 80ch;
  margin: 0 auto;
  .btn {
    margin-top: 2rem;
  }
  @media (max-width: 576px) {
    max-width: 35ch;
  }
  @media (max-width: 768px) {
    max-width: 50ch;
  }
`;

export const LinkContainer = styled.ul`
  padding-left: 0%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  a {
    color: var(--secondary-color);
  }
`;
