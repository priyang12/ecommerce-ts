import { styled } from "@linaria/react";

export const StyledPage = styled.div`
  min-height: 80vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-default);
  color: var(--text-primary);
  text-align: center;
  gap: 1.5rem;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: var(--primary-600);
  }

  p {
    font-size: 1.25rem;
    max-width: 40ch;
  }

  a {
    color: var(--primary-500);
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-700);
    }
  }
`;
