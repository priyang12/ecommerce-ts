import styled from "styled-components";

export const StyledPlaceOrder = styled.div`
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  .OrderDetails {
    flex: 2;
  }
  @media (min-width: 800px) {
    display: flex;
    max-width: 100vw;
  }
`;

export const StyledHeader = styled.h1`
  font-family: "Nunito Sans";
  color: #c6b2de;
`;

export const StyledOrderSummary = styled.div`
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #c6b2de;
  .btn {
    margin: 0;
    margin-top: 2 rem;
  }
  @media (min-width: 800px) {
    width: 30%;
  }
`;

export const StyledOrderSummaryBody = styled.ul`
  margin: 1.5rem 0;
  border-bottom: 1px solid white;
`;

export const StyledOrderSummaryItem = styled.li`
  display: flex;
  margin: 1.5rem 1rem;
  border-bottom: 1px solid white;
  justify-content: space-between;
`;
