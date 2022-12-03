import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Helmet } from "react-helmet-async";
import { useQueryErrorResetBoundary } from "react-query";
import {
  StyledButton,
  StyledErrorCatch,
  StyledErrorCatchMessage,
} from "../StyledComponents/StyledErrorCatch";

const FallbackUI = ({ error, resetErrorBoundary }: FallbackProps) => {
  const message =
    process.env.NODE_ENV === "production" ? "Server Error" : error.message;
  return (
    <StyledErrorCatch>
      <Helmet>
        <title>Opps Error!</title>
        <meta name="description" content={`Error - ${message}`} />
      </Helmet>
      <StyledErrorCatchMessage>
        {message ? message : "Something went wrong"}
        <br />
      </StyledErrorCatchMessage>
      <StyledButton onClick={resetErrorBoundary} className="btn">
        Try again
      </StyledButton>
    </StyledErrorCatch>
  );
};

const CarouselBoundary = ({ children }: any) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={FallbackUI} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
};

export default CarouselBoundary;
