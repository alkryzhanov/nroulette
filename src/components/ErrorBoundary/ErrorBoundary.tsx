import React, { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ErrBoundaryProps = {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
};

type ErrorFallbackProps = {
  // eslint-disable-next-line react/require-default-props
  error: {
    message: string;
  };
};

function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

const ErrBoundary = ({ children }: ErrBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default ErrBoundary;
