import styled from "styled-components";

export const StyledOrderList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const StyledOrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.5rem;
  & > p {
    margin: 0;
  }
`;

export const StyledListItems = styled.li`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 10rem;
  img {
    width: 100%;
  }
  p {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    margin: 0;
  }
  @media (max-width: 400px) {
    width: 50%;
    margin: auto;
  }
`;
