import React from "react";
import { StyledLoadingButton } from "./StyledLoadingButton";

export type LoadingButtonProps = {
  isLoading: boolean;
  loadingText?: string;
};

/**
 * A styled button component for form submissions and actions,
 * supporting a loading state and theme-based styling.
 *
 * Applies primary color tokens from the global theme, with hover
 * and disabled state styles included.
 *
 * Responsive adjustments are made for smaller screens.
 *
 * @component
 * @example
 * <StyledLoadingButton disabled={isLoading}>Submit</StyledLoadingButton>
 * <StyledLoadingButton disabled={isLoading} loadingText="Custom Loading Text">Submit</StyledLoadingButton>
 */
function LoadingButton({
  isLoading,
  loadingText,
  children,
  ...props
}: LoadingButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <StyledLoadingButton
      disabled={isLoading}
      {...props}
      aria-busy={isLoading ? "true" : "false"}
    >
      {isLoading ? (loadingText ? loadingText : "Loading...") : children}
    </StyledLoadingButton>
  );
}

export default LoadingButton;
