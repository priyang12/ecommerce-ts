import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";
import FallbackUI from "../FallbackUI";

const CarouselBoundary = ({ children }: any) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={FallbackUI} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
};

export default CarouselBoundary;
