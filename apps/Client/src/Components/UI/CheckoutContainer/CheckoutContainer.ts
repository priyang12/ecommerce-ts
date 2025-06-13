import { styled } from "@linaria/react";
import { media } from "../../../Utils/Variables";

export const StyledCheckoutContainer = styled.section`
  width: 100%;
  margin: 2em auto;
  max-width: 50vw;
  ${media.mobile} {
    max-width: 30vw;
  }
  ${media.tablet} {
    max-width: 50vw;
  }
  ${media.laptop} {
    max-width: 70vw;
  }
`;

export const StyledCheckoutLayout = styled.div`
  height: 100vh;
`;
