import { styled } from "@linaria/react";

export const StyledRadioFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-block: 2rem;
  padding: 1rem;
  background-color: var(--bg-surface);
  border-radius: 0.5rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

export const StyledRadioFormControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  input[type="radio"] {
    accent-color: var(--secondary-500);
    width: 1.2rem;
    height: 1.2rem;
  }

  label {
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;
