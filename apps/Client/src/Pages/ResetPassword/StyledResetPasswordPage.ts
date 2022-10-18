import styled from "styled-components";

export const StyledResetPasswordPage = styled.div`
  margin: auto;
  width: 100%;
  max-width: 50ch;
  a {
    color: var(--secondary-light-color);
    font-size: 2rem;
    text-align: center;
  }
  form {
    margin-top: 3em;
    gap: 1rem;
    input:valid ~ label {
      transform: translateY(-200%) translateX(-1%);
    }
  }
`;
