import { styled } from "@linaria/react";

export const ReviewContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  margin: auto;
  background-color: var(--bg-surface);
  background: url("../images/circle-scatter-haikei.svg") repeat;
  border-top: 2px solid var(--bg-contrast);
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
  overflow: hidden;
`;

export const ReviewItem = styled.li`
  display: block;
  margin: 1em;
  min-width: 40ch;
  max-width: 60ch;
  padding: 1em;
  &:nth-child(odd) {
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

export const StyledLoadingReview = styled.div`
  padding: 1rem;
  background-color: var(--bg-surface);
  border: 1px solid var(--bg-contrast);
  border-radius: 6px;
  margin-top: 2rem;
  text-align: center;
  height: 50vh;
  p {
    font-size: 5rem;
    font-weight: 500;
    color: var(--text-secondary);
  }
`;

export const NoReview = styled.h2`
  font-size: 5rem;
  text-align: center;
`;
