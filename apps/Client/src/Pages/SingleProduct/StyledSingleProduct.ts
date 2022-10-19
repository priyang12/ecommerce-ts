import styled from "styled-components";
import { FormControl } from "../../StyledComponents/FormControl";
import { media } from "../../Variables";

export const StyledContainer = styled.section`
  max-width: 120ch;
  width: 100%;
  margin: 2rem auto;
`;

export const StyledProduct = styled.div`
  color: var(--secondary-light-color);
  display: grid;
  gap: 1rem;
  @media (min-width: 100px) and (max-width: 600px) and (orientation: portrait) {
    width: 90%;
    margin: auto;
    grid-template-columns: 1fr;
  }

  ${media.LargerThanTablet} {
    grid-template-columns: 1fr 2fr;
  }
  ${media.LargerThanLaptop} {
    grid-template-columns: 2fr 2fr 1fr;
    grid-template-rows: 2fr 1fr;
  }
`;
export const StyledImageContainer = styled.div`
  width: 100%;
  grid-column: 1 / span 2;
  img {
    width: 100%;
    /* height: 150%; */
  }
  ${media.mobile} {
    grid-column: 1;
  }
`;

export const StyledDetails = styled.div`
  height: fit-content;
  backdrop-filter: blur(8px) saturate(184%);
  -webkit-backdrop-filter: blur(8px) saturate(184%);
  color: var(--bg-contrast-color);
  background-color: rgba(163, 172, 191, 0.22);
  border: 1px solid var(--bg-contrast-color);
  padding: 1em;
  border-radius: var(--border-radius);
  h1 {
    margin: 0;
  }
`;
export const StyledCheckout = styled.div`
  padding: 1em;
  background-color: var(--primary-dark-color);
  border: 1px solid #fff;
  .status-label {
    padding-bottom: 1em;
    border-bottom: 2px solid var(--bg-contrast-color);
  }
  @media (min-width: 500px) and (max-width: 799px) {
    grid-column: 1 / span 2;
  }
`;

export const StyledQuantity = styled.div`
  ${media.laptop} {
    grid-column: 1/3;
  }
  ${media.mobile} {
    grid-column: 1;
  }
`;

export const CheckFormControl = styled.div`
  margin: 0 auto;
  width: 90%;
  label {
    width: 100%;
    font-size: 2rem;
  }
`;
