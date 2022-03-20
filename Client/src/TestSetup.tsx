import { QueryClientProvider } from "react-query";

import { queryClient } from "./query";

export const Wrapper = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
