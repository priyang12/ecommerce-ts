import { styled } from "@linaria/react";

export const StyledContainer = styled.div`
  margin: 3rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: var(--bg-surface);
  color: var(--text-primary);
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2rem;
    color: var(--primary-700);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 40ch;
    margin-bottom: 2rem;
  }

  .links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  a {
    color: var(--primary-600);
    font-weight: 500;
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-800);
    }
  }

  @media (max-width: 600px) {
    margin-top: 4rem;
    padding: 1.5rem;

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;
