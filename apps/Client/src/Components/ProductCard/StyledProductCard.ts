import styled from "styled-components";
import { media } from "../../Utils/Variables";

export const StyledProductCard = styled.div`
  background-color: var(--bg-default);
  border: 1px solid var(--bg-contrast);
  border-radius: 8px;
  overflow: hidden;
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.3s ease;
  outline: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    box-shadow: 0 0 0 5px var(--secondary-500);
  }

  &:hover img {
    transform: scale(1.03);
  }

  a {
    text-decoration: none;
  }
`;

export const StyledCardTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0.5rem 0 1rem;
  text-decoration: none;
`;

export const StyledCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5%;
  max-height: 200px;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

export const StyledProductPrice = styled.h2`
  font-size: clamp(1.913rem, calc(12px + 2.475vw), 2.587rem);
  font-weight: bold;
  color: var(--primary-500);
  margin: 0;
`;
