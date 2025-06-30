import { styled } from "@linaria/react";

export const StyledSelect = styled.select`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid var(--primary-500);
  background-color: var(--bg-surface);
  color: var(--text-primary);
  outline: none;
  cursor: pointer;
  appearance: none; /* Removes default arrow for consistent custom styling */

  &:focus {
    border-width: 2px;
    border-color: var(--secondary-200);
    box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.2);
  }

  &:disabled {
    background-color: #f2f2f2;
    cursor: not-allowed;
  }
`;
