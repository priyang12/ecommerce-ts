import styled from "styled-components";

export const StyledProductList = styled.ul`
  padding: 1rem 0;
`;

export const StyledItem = styled.li`
  box-shadow: 0px 8px 16px #d3d3d3;
  border-radius: 10px;
  font-size: 1.2rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  align-items: center;
  justify-items: center;
  text-align: center;
  width: ${(props) => props.theme.width};
  }
  a {
    max-width: 80%;
    color: var(--color-primary);
    text-decoration: underline;
    word-break: break-all;
  }
  img {
    width: 80%;
  }
  @media (max-width: 768px) {
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
  margin: 1rem 0;
  align-items: center;
  width: 100%;
  font-size: 1.5rem;
  select {
    font-size: 1.5rem;
    background: transparent;
    padding: 0.5rem;
    border-radius: 15px;
    color: var(--color-primary);
  }
`;
