import styled from "styled-components";

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
    text-align: left;
  }
  textarea:valid ~ label {
    margin-left: 3px;
    margin-bottom: 7em;
  }
  input:focus ~ .bar {
    height: 5px;
    background-color: #333;
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
`;

export const Input = styled.input`
  border: none;
  font-size: 1rem;
  padding: 1em;
  &:focus {
    border: 4px solid white;
    outline: none;
  }
`;

export const SubmitButton = styled.input`
  width: 100%;
  border-radius: var(--border-radius);
`;
