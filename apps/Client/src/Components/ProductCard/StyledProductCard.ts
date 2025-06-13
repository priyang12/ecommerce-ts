import { styled } from "@linaria/react";
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

export const StyledCardTitle = styled.h2`
  height: 15%;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0.5rem 0 1rem;
  text-decoration: none;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

export const StyledCardImage = styled.img`
  width: 100%;
  height: 45%;
  border-radius: 5%;
  transition: transform 0.3s ease;
`;

export const StyledCardBottomContainer = styled.div`
  /* height: 40%; */
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export const StyledProductPrice = styled.h2`
  /* font-size: clamp(1rem, calc(10px + 1.5vw), 1.5rem); */
  font-weight: bold;
  color: var(--primary-500);
  margin: 0;
`;

export const StyledRating = styled.span`
  padding: 0.5rem;
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

export const DealTag = styled.div`
  background: var(--error);
  color: var(--text-primary);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const DeliveryInfo = styled.div`
  color: var(--success);
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;
