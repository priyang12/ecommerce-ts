import styled from "styled-components";

export const StyledContainer = styled.section`
  width: 100%;
  margin: ${(props) => props.theme.marginTop}em auto;
  max-width: 100ch;
`;

export const FragmentContainer = styled.div`
  margin: 10rem auto;
  padding: 2rem;
  max-width: 100ch;
  width: 80%;
`;
