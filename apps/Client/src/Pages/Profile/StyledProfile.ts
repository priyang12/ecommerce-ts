import styled from "styled-components";
import { media } from "../../Utils/Variables";

export const StyledProfile = styled.div`
  width: 80%;
  margin: 5em auto;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  form {
    gap: 1rem;

    label {
      font-size: 1.2rem;
    }
    input {
      border-radius: var(--border-radius);
    }
  }
  ${media.tablet} {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
`;
