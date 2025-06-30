import { styled } from "@linaria/react";

export const StyledQuantityOptions = styled.option`
  padding: 0.5rem;
  background-color: var(--bg-surface, #fff);
  color: var(--text-primary, #333);
  font-size: 1rem;

  &:disabled {
    color: #aaa;
  }
`;
