import styled from "styled-components";
import { media } from "../../Variables";

export const StyledHeading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
`;

export const StyledProducts = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 2em;
  border: 1px solid #ccc;
  margin: 1em;
  img {
    width: 100%;
    height: 100%;
  }
  .btn-light {
    color: #fff;
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledProduct = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1em;
  width: 100%;
  max-width: 350px;
  img {
    width: 100%;
    height: 100%;
  }
  .btn-light {
    background-color: var(--primary-bg-color);
  }
  @media screen and (max-width: 1000px) {
    max-width: 250px;
  }
  ${media.tablet} {
    max-width: 200px;
  }
  @media (max-width: 576px) {
    max-width: 350px;
  }
`;

export const StyledProductTitle = styled.h2`
  color: var(--secondary-light-color);
  width: 100%;
  height: 5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledProductDescription = styled.p`
  color: var(--secondary-light-color);
  width: 100%;
  height: 20%;
  white-space: rap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledProductPrice = styled.h3`
  margin: 0.5em;
  width: 50%;
  color: var(--secondary-light-color);
  background-color: var(--primary-bg-color);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;
