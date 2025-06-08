import styled from "styled-components";
import { media } from "../../Utils/Variables";

export const StyledForgetPassword = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50ch;
  margin: 0 auto;
  padding: 0 1.5em;
  input {
    padding: 0.9em;
  }
  input:valid ~ label {
    transform: translateY(-150%) translateX(-1%);
  }
  ${media.tablet} {
    padding: 0;
  }
`;
