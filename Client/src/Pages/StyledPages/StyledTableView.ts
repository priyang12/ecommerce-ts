import styled from "styled-components";

export const StyledTableContainer = styled.section`
  width: 100%;
  margin: 0 auto;
`;

export const StyledHeaders = styled.div`
  display: none;
  padding: 0 2rem;
  margin: 1em;
  h2:nth-child(3) {
    text-align: center;
  }
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    gap: 1rem;
  }
`;
export const StyledList = styled.ul`
  // background-color: #e3c9e5;
`;

export const StyledItems = styled.li`
  margin: 1em;
  padding: 1em;
  font-size: 1.3rem;
  background-color: var(--secondary-light-color);
  color: var(--secondary-dark-color);
  border-radius: 0.5rem;
  p {
    min-width: 100%;
  }
  .btn {
    margin-left: auto;
  }
  @media (min-width: 600px) {
    display: grid;
    text-align: center;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    gap: 1rem;
  }
  @media (min-width: 800px) {
    p:nth-child(3) {
      text-align: center;
    }
    text-align: left;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;
