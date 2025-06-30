import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const StyledAlertContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

export const StyledAlertDisplay = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  padding: 1em;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  p {
    margin: 0.5rem;
  }
`;

export const alertSuccess = css`
  background-color: var(--alert-success-bg, #afdbaf);
`;

export const alertError = css`
  background-color: var(--alert-error-bg, #ef251b);
`;

export const alertWarning = css`
  background-color: var(--alert-warning-bg, #ff9800);
`;

export const alertInfo = css`
  background-color: var(--alert-info-bg, #2196f3);
`;
