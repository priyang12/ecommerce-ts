import styled from "styled-components";

export const CardBoard = styled.section`
  display: grid;
  margin: auto;
  padding: 1em;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-template-rows: 1fr;
  gap: 2rem;
`;

export const Card = styled.article`
  display: grid;
  text-align: center;
  grid-auto-flow: row;
  grid-auto-columns: minmax(0, 1fr);
  align-items: center;
  justify-items: center;
  padding: 1rem;
  img {
    border-radius: 5%;
    width: 100%;
    height: 100%;
  }
`;
