import { StyledErrorContainer, StyledFallbackUI } from "./StyledFallbackUI";
import { StyledButton, StyledErrorCatchMessage } from "./StyledFallbackUI";
import { Helmet } from "react-helmet-async";
import { FallbackProps } from "react-error-boundary";

/**
 * Error boundary fallback UI component for handling runtime errors.
 *
 * @component
 * @example
 * // Usage with ErrorBoundary:
 * <ErrorBoundary FallbackComponent={FallbackUI}>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * @description
 * This component displays a user-friendly error message when a JavaScript error
 * is caught by the React Error Boundary. In production, it shows a generic message
 * while in development it displays the actual error message.
 *
 * @param {Object} props - Component props
 * @param {Error} props.error - The caught error object
 * @param {Function} props.resetErrorBoundary - Callback to reset the error state
 *
 * @returns {React.ReactElement} A styled error fallback UI with recovery option
 */
function FallbackUI({ error, resetErrorBoundary }: FallbackProps) {
  const message =
    process.env.NODE_ENV === "production" ? "Server Error" : error.message;

  return (
    <StyledFallbackUI>
      <Helmet>
        <title>Opps Error!</title>
        <meta name="description" content={`Error - ${message}`} />
      </Helmet>
      <StyledErrorContainer>
        <StyledErrorCatchMessage data-testId="error-message">
          {message ? message : "Something went wrong"}
          <br />
        </StyledErrorCatchMessage>
        <StyledButton onClick={resetErrorBoundary} className="btn">
          Try again
        </StyledButton>
      </StyledErrorContainer>
    </StyledFallbackUI>
  );
}

export default FallbackUI;
