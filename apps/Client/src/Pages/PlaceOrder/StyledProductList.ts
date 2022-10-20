import styled from "styled-components";
import { media } from "../../Variables";

export const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: center;
  font-size: 1.2rem;
  box-shadow: inset 0px 0px 2px 0px var(--bg-contrast-color);
  padding: 1em;
  border-radius: var(--border-radius);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: inset 0px 0px 20px 0px #d3d3d3;
  }
  width: ${(props) => props.theme.width};
  a {
    max-width: 80%;
    color: var(--color-primary);
    text-decoration: underline;
    word-break: break-all;
  }
  img {
    width: 100%;
  }
  ${media.tablet} {
    margin: 0 auto;
    width: 70%;
  }
`;

export const StyledPrice = styled.p`
  margin: 0;
  font-size: 2rem;
`;

export const StyledQuantity = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 1.5rem;
  align-items: center;
  width: 100%;
`;
