import styled from "styled-components";
import { media } from "../../Utils/Variables";

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
  width: 90%;
  gap: 1rem;
  padding: 2em;
  margin: 2em auto;
  border: 1px solid var(--bg-contrast-color);
  border-radius: var(--border-radius);
  justify-content: space-evenly;
  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

export const StyledProduct = styled.li`
  display: flex;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  border: 1px solid var(--bg-contrast-color);
  padding: 1em;
  margin: 1em;
  width: 100%;
  backdrop-filter: blur(8px) saturate(200%);
  -webkit-backdrop-filter: blur(8px) saturate(200%);
  background-color: var(--bg-color-alpha);
  border: 1px solid var(--bg-contrast-color);
  border-radius: var(--border-radius);
  max-width: 25vw;
  img {
    width: 100%;
    height: 100%;
  }
  transition: outline 0.2s ease-in-out;
  &:focus,
  &:hover {
    outline: 5px solid var(--primary-color);
  }
  ${media.laptop} {
    max-width: 40vw;
  }
  ${media.mobile} {
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
  margin: 0;
`;

export const StyledProductDescription = styled.p`
  color: var(--secondary-light-color);
  width: 100%;
  height: 50vh;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const StyledProductPrice = styled.h3`
  width: 80%;
  margin: 0.5em;
  background-color: var(--primary-color);
  color: var(--bg-contrast-color);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;
