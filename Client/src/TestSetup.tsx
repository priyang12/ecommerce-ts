import "@testing-library/jest-dom";
import { QueryClientProvider, QueryClient } from "react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const Wrapper = ({ children }: any) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
