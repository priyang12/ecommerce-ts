import { styled } from "@linaria/react";

export const StyledLoadingButton = styled.button`
  background-color: var(--btn-bg, var(--text-primary));
  color: var(--btn-text, var(--bg-color));
  cursor: pointer;
  padding: 1rem 2rem;
  margin: 0.5rem;
  border: 2px solid var(--btn-border, transparent);
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: var(--border-radius, 0.5em);
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: capitalize;

  &:hover {
    background-color: var(--btn-bg-hover, var(--text-secondary));
    color: var(--btn-text-hover, var(--secondary-500));
    border-color: var(--btn-border-hover, var(--secondary-500));
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media screen and (max-width: 576px) {
    width: auto;
    text-align: center;
  }
`;
