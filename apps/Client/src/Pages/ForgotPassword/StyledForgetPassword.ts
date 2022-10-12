import styled from "styled-components";

export const StyledForgetPassword = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100ch;
  margin: 0 auto;
  padding: 0 1.5rem;
  form {
    margin: 1em 0;
  }
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;
