import { styled } from "@linaria/react";

// Container for the list of orders
export const StyledOrderLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;
`;

// Individual order item
export const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.5rem;
  background-color: var(--bg-surface);
  border: 1px solid var(--neutral-500);
  border-radius: var(--border-radius);
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: var(--primary-400);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }

  p {
    margin: 0;
    color: var(--text-primary);
    font-size: 0.95rem;

    &:first-child {
      font-weight: 600;
      color: var(--primary-700);
    }
  }

  .success {
    padding: 1em;
    color: var(--success);
    background-color: var(--neutral-200);
    font-weight: 600;
  }

  .alert {
    padding: 1em;
    color: var(--error);
    background-color: var(--neutral-200);
    font-weight: 600;
  }
  * {
    width: 25%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledEmptyContainer = styled.div`
  height: 100vh;
  text-align: center;
  h1 {
    font-size: 5rem;
  }
`;

export const StyledSpinnerWrapper = styled.div`
  display: flex;
`;
