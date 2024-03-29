import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet-async";
import {
  StyledButton,
  StyledErrorCatch,
  StyledErrorCatchMessage,
} from "./StyledComponents/StyledErrorCatch";

const FallbackUI = ({ error, componentStack }: any) => {
  const resetErrorBoundary = () => {
    window.location.reload();
  };
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
        {componentStack}
      </StyledErrorCatchMessage>
      <StyledButton onClick={resetErrorBoundary} className="btn">
        Try again
      </StyledButton>
    </StyledErrorCatch>
  );
};

const ErrorCatch = ({ children }: any) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>{children}</ErrorBoundary>
  );
};

export default ErrorCatch;
