import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { setLogger } from "react-query";

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
});

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      <ToastContainer />
      <HelmetProvider>{children}</HelmetProvider>
    </QueryClientProvider>
  );
};
