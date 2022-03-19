import { QueryClientProvider } from "react-query";

import { queryClient } from "../../index";

export const Wrapper = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
