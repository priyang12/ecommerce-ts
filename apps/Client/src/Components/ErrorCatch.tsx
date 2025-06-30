import { ErrorBoundary } from "react-error-boundary";
import FallbackUI from "./FallbackUI";

const ErrorCatch = ({ children }: any) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>{children}</ErrorBoundary>
  );
};

export default ErrorCatch;
