import { ErrorBoundary } from "react-error-boundary";
import AlertDisplay from "./AlertDisplay";
import {
  StyledButton,
  StyledErrorCatch,
} from "./StyledComponents/StyledErrorCatch";

const FallbackUI = ({ error, componentStack }: any) => {
  const resetErrorBoundary = () => {
    window.location.reload();
  };
  let message =
    process.env.NODE_ENV === "production" ? "Server Error" : error.message;
  return (
    <StyledErrorCatch>
      <h1>Something went wrong</h1>
      <p>
        <AlertDisplay msg={message} type={false} />
        <br />
        {componentStack}
      </p>
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
