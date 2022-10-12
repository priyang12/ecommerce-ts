import styled from "styled-components";

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PaginationButton = styled.button<{ active: boolean }>`
  background: none;
  border: 2px solid var(--main-bg-color);
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => (props.active ? "white" : "palevioletred")};
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${(props) => (props.active ? "#fff" : "#000")};
    color: ${(props) => (props.active ? "palevioletred" : "white")};
  }
`;
