import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";
import { css } from "@linaria/core";

export const StyledAuthPage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em 1em;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #ffffff);

  ${media.tablet} {
    min-height: 50vh;
  }
  .container {
    width: 100%;
    max-width: 500px;
    padding: 2em;
    border-radius: 16px;
    background-color: var(--bg-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
    }

    .alert {
      background-color: #ffcdd2;
      color: #b71c1c;
      padding: 0.75em 1em;
      border-radius: 8px;
      margin-bottom: 1em;
      font-size: 1rem;
      text-align: center;
    }
  }

  .Link-border {
    border-bottom: 3px solid var(--secondary-200);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;

    label {
      font-size: 1rem;
      margin-bottom: 0.25em;
    }

    input {
      padding: 0.75em;
      font-size: 1rem;
      outline: none;
    }
  }

  a {
    color: var(--primary-700);
    text-decoration: none;
    transition: border-bottom 0.2s ease;

    &:hover {
      border-bottom: 2px solid var(--primary-300);
    }
  }

  .help {
    margin-top: 2em;
    text-align: center;
    font-size: 0.95rem;

    a {
      font-weight: bold;
    }
  }
`;

export const headerContainer = css`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5em;

  h1 {
    font-size: 1.8rem;
    margin: 0;
    padding: 0.5em 1em;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: var(--primary-200);
    }
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: center;

    h1 {
      padding: 0.5em 0;
    }
  }
`;
