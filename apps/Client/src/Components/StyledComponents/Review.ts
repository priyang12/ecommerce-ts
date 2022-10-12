import styled from "styled-components";

export const ReviewContainer = styled.div`
  width: 100%;
  max-width: 100ch;
  margin: auto;
  border-top: 2px solid darken($color: $PrimaryColor, $amount: 50);
  background: url("../images/circle-scatter-haikei.svg") repeat;
  border-radius: 20px;
  h1 {
    color: aliceblue;
    text-align: center;
  }
`;

export const ReviewList = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const ReviewItem = styled.li`
  display: block;
  margin: 1em;
  min-width: 40ch;
  max-width: 60ch;
  padding: 1em;
  &:nth-child(odd) {
    // background-color: darken($color: $PrimaryColor, $amount: 20);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
  }
  &:nth-child(even) {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    color: $AssetColor;
  }
`;
