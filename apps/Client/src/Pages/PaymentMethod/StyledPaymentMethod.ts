import styled from "styled-components";

export const StyledRadioFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const StyledRadioFormControl = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  color: var(--bg-contrast-color);
  font-size: 1.2rem;
  input {
    margin: 0 2em;
  }
  label {
    padding: 1em 1em;
  }
  input[type="radio"] {
    cursor: pointer;
    width: 50px;
    &:checked {
      border-radius: 50%;
    }
  }
  input[type="radio"]:checked + label {
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
  }
`;
