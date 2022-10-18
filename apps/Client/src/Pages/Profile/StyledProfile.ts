import styled from "styled-components";
import { media } from "../../Variables";

export const StyledProfile = styled.div`
  width: 80%;
  margin: 5em auto;
  height: 100%;
  background-color: #fafafa;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  ${media.tablet} {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
`;
