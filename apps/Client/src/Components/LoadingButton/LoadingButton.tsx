import React from "react";

export type LoadingButtonProps = {
  isLoading: boolean;
  loadingText?: string;
};

function LoadingButton({
  isLoading,
  loadingText,
  children,
  ...props
}: LoadingButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button disabled={isLoading} {...props}>
      {isLoading ? (loadingText ? loadingText : "Loading...") : children}
    </button>
  );
}

export default LoadingButton;
