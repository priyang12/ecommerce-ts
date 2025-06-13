import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const StyledContainer = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;

  h1 {
    font-size: 2.5rem;
  }
  ${media.tablet} {
    width: 90%;
    h1 {
      font-size: 3rem;
      text-align: center;
    }
  }
`;
