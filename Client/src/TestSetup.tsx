import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

export const Wrapper = ({ children }: any) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
