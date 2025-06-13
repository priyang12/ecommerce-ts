import { styled } from "@linaria/react";
import { media } from "../../../Utils/Variables";

export const StyledCartContainer = styled.div<{ isWideLayout: boolean }>`
  display: flex;
  flex-direction: ${({ isWideLayout }) => (isWideLayout ? "row" : "column")};
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  margin: 0 auto;
  border-bottom: 5px solid var(--secondary-500);
  ${media.tablet} {
    flex-direction: column;
  }
`;

export const StyledCart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledCheckout = styled.div<{ isWideLayout: boolean }>`
  width: ${({ isWideLayout }) => (isWideLayout ? "auto" : "50%")};
  flex: 1;
  padding: 1rem;
  background: var(--bg-surface);
  border-radius: 8px;
  position: sticky;
  top: 1rem;
  height: fit-content;
  h3 {
    margin-bottom: 0.5rem;
  }
`;

export const StyledCheckoutButton = styled.button`
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 2px solid var(--secondary-500);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-surface-hover, #222);
  }
`;

export const CartCard = styled.div`
  display: flex;
  width: 60vw;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: var(--bg-surface);
  border: 1px solid var(--primary-500);
  border-radius: 12px;
  align-items: flex-start;
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  }
  ${media.tablet} {
    flex-direction: column;
  }
`;

export const CartImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: var(--bg-default);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CartInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CartInfo = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  .ProductName {
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--text-primary);

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: var(--primary-500);
      }
    }
  }

  .price {
    font-size: 1rem;
    color: var(--text-secondary);
  }
`;

export const TotalPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-500);
  background-color: var(--bg-default);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-top: auto;
  align-self: flex-end;
  white-space: nowrap;
  box-shadow: 0 0 0 1px rgba(38, 143, 255, 0.2);
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  width: 50%;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: var(--secondary-500);
  color: var(--text-primary);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.2s ease;
  svg {
    font-size: 1rem;
  }

  &:hover {
    background-color: #cc4b4b;
  }
  &:nth-of-type(2) {
    background-color: var(--primary-500);

    &:hover {
      background-color: #1976d2;
    }
  }
  ${media.tablet} {
    width: auto;
  }
`;

export const StyledEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  height: 50vh;
  h1 {
    font-size: 2rem;
    color: #555;
    margin-bottom: 1rem;
  }

  p {
    color: #777;
    font-size: 1rem;
  }
`;
