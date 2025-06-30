import { styled } from "@linaria/react";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  min-height: 100vh;
  background-color: var(--bg-surface);
`;

export const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

export const StyledHeading = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: black;
`;

export const StyledLottieWrapper = styled.div`
  margin-top: 2rem;
`;

export const StyledSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
