import { styled } from "@linaria/react";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1.5em;
  position: relative;
  width: 100%;
  .bar {
    transition: all 0.8s ease;
  }

  input:valid ~ label {
    transform: translateY(-150%) translateX(-1%);
    color: var(--text-primary);
    text-align: left;
  }
  textarea:valid ~ label {
    margin-left: 3px;
    margin-bottom: 7em;
  }
  input:focus ~ .bar {
    height: 5px;
    background-color: var(--bg-default);
  }
`;

export const Label = styled.label`
  position: absolute;
  width: 100%;
  padding-left: 0.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.5s ease;
  color: var(--primary-500);
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 1em;
  border-radius: 8px;
  transition: linear border 0.5s;

  &:focus {
    border: 4px solid white;
    border-color: var(--primary-500);
  }
  &.error-input {
    border-color: var(--error);
  }
`;

export const SubmitButton = styled.input`
  width: 100%;
  margin: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-primary);
  background-color: var(--primary-500);
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  padding: 1rem 2rem;
  transition: background-color 1s;

  &:hover {
    color: var(--text-secondary);
    background-color: var(--bg-default);
    border: 2px solid var(--secondary-500);
  }
`;
