import { styled } from "@linaria/react";
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
    justify-content: space-evenly;
    max-width: 100vw;
  }
`;

export const StyledHeader = styled.h1`
  font-family: "Nunito Sans";
  color: var(--primary-200);
`;

export const StyledParagraph = styled.p`
  font-family: "Nunito Sans";
  font-size: 1.5rem;
  color: var(--text-secondary);
`;

export const StyledOrderSummary = styled.div`
  border-radius: 10px;
  color: var(--bg-contrast-color);
  background-color: var(--bg-surface);
  padding: 1rem;
  border: 1px solid #c6b2de;
  height: fit-content;
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
  justify-content: space-between;
  margin: 1.5rem 1rem;
`;

export const StyledItemContainer = styled.ul`
  overflow-y: scroll;
  max-height: 300px;
`;

export const StyledItem = styled.li<{ theme: { width: string } }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-surface);
  width: ${(props) => props.theme.width};
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--secondary-300);
  border-radius: 6px;
  gap: 1rem;

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }

  & img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 0.75rem;
  }

  & a {
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 500;

    &:hover {
      color: var(--info);
    }
  }
`;

// Price breakdown text
export const StyledPrice = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

// Quantity and total cost
export const StyledQuantity = styled.div`
  font-size: 0.95rem;
  color: #666;
  color: var(--text-primary);
  label {
    font-weight: 600;
    margin-right: 0.5rem;
    color: var(--text-secondary);
  }

  div {
    display: inline-block;
    font-weight: 500;
    color: var(--text-secondary);
  }
`;
