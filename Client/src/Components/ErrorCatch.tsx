import { ErrorBoundary } from "react-error-boundary";
import AlertDisplay from "./AlertDisplay";
import { FragmentContainer } from "./StyledComponents/Container";

const FallbackUI = ({ error, componentStack }: any) => {
  const resetErrorBoundary = () => {
    window.location.reload();
  };
  return (
    <FragmentContainer>
      <h1>Something went wrong</h1>
      <p>
        <AlertDisplay msg={error.message} type={false} />
        <br />
        {componentStack}
      </p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </FragmentContainer>
  );
};

const ErrorCatch = ({ children }: any) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>{children}</ErrorBoundary>
  );
};

export default ErrorCatch;
