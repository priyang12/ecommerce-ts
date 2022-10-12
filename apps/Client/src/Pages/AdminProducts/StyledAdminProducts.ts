import styled from "styled-components";

export const StyledProducts = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 2em;
  border: 1px solid #ccc;
  margin: 1em;
  img {
    width: 100%;
    height: 100%;
  }
  .btn-light {
    color: #fff;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;
export const StyledProductTitle = styled.h2`
  margin: 0;
  color: var(--secondary-light-color);
`;
