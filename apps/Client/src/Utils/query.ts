import { QueryClient } from "react-query";

/**
 * Pre-configured QueryClient instance for React Query
 *
 * @type {QueryClient}
 * @property {Object} defaultOptions - Default options for queries
 * @property {boolean} defaultOptions.queries.refetchOnWindowFocus - Disables refetch on window focus
 * @property {boolean} defaultOptions.queries.refetchOnReconnect - Disables refetch on reconnect
 * @property {boolean} defaultOptions.queries.retry - Disables query retries
 * @property {number} defaultOptions.queries.staleTime - Sets stale time to 5 minutes (in milliseconds)
 *
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
