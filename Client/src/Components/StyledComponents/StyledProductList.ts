import styled from "styled-components";

export const StyledProductList = styled.ul`
  padding: 2rem 0;
`;

export const StyledItem = styled.li`
  margin: 1em 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  align-items: center;
  justify-items: center;
  a {
    max-width: 80%;
    word-break: break-all;
  }
  img {
    width: 50%;
  }
`;

export const StyledQuantity = styled.div`
  display: flex;
  //   flex-direction: column;
`;
