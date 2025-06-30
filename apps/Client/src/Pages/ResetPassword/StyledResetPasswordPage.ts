import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const StyledResetPasswordPage = styled.div`
  margin: auto;
  width: 100%;
  min-height: 100vh;
  max-width: 50ch;
  a {
    color: var(--text-secondary);
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

export const StyledResetContainer = styled.div`
  width: 100%;
  padding: 2rem;
  border: 1px solid var(--primary-500);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  p {
    font-size: 1rem;
    color: var(--text-light-color);
    margin-bottom: 1.5rem;
  }
  form {
    width: 100%;
    label {
      width: auto;
    }
  }
  ${media.tablet} {
    padding: 1rem;
    width: auto;
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;
