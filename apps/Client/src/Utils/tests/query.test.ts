import { describe, it, expect, beforeEach } from "vitest";
import { QueryClient } from "react-query";
import { queryClient } from "../query"; // adjust import path

describe("queryClient configuration", () => {
  let client: QueryClient;

  beforeEach(() => {
    // Create a fresh client for each test
    client = new QueryClient({
      defaultOptions: {
        queries: queryClient.defaultQueryOptions(),
      },
    });
  });

  it("should maintain all specified default options", () => {
    const expectedOptions = {
      queries: {
        _defaulted: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 300000, // 5 minutes in ms
      },
    };
    expect(client.getDefaultOptions()).toEqual(expectedOptions);
  });
});
