import { styled } from "@linaria/react";
import { media } from "../../../Utils/Variables";

export const StyledCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledCart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledCheckout = styled.div`
  border-top: 1px solid var(--primary-800);
  padding-top: 1.5rem;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
  }

  p {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    background-color: var(--bg-surface);
    color: #fff;
    text-align: center;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #444;
    }
  }
`;
