import styled from "styled-components";
import { media } from "../../Utils/Variables";

export const StyledPlaceOrder = styled.div`
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  .OrderDetails {
    flex: 2;
    .detail {
      p {
        margin: 0;
      }
    }
  }
  ${media.LargerThanLaptop} {
    display: flex;
    max-width: 100vw;
  }
`;

export const StyledHeader = styled.h1`
  font-family: "Nunito Sans";
  color: var(--primary-light-color);
`;

export const StyledParagraph = styled.p`
  font-family: "Nunito Sans";
  font-size: 1.5rem;
  color: var(--bg-contrast-color);
`;

export const StyledOrderSummary = styled.div`
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #c6b2de;
  height: fit-content;
  color: var(--bg-contrast-color);
  .btn {
    margin: 0;
    margin-top: 2 rem;
  }
  ${media.LargerThanLaptop} {
    width: 30%;
  }
`;

export const StyledOrderSummaryBody = styled.ul`
  margin: 1.5rem 0;
  border-bottom: 1px solid var(--bg-contrast-color);
`;

export const StyledOrderSummaryItem = styled.li`
  display: flex;
  margin: 1.5rem 1rem;
  border-bottom: 1px solid var(--bg-contrast-color);
  justify-content: space-between;
`;
