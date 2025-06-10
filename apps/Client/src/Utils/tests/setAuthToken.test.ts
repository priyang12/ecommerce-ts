import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import setAuthToken from "../setAuthToken"; // adjust the import path as needed

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Mock axios defaults
vi.mock("axios", () => {
  return {
    default: {
      defaults: {
        headers: {
          common: {},
          post: {},
        },
      },
    },
  };
});

describe("setAuthToken", () => {
  beforeEach(() => {
    // Replace global localStorage with our mock
    vi.stubGlobal("localStorage", localStorageMock);
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Reset axios headers
    axios.defaults.headers.common = {};
    axios.defaults.headers.post = {};
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should set axios headers and not touch localStorage when token is provided", () => {
    const testToken = "test.jwt.token";

    setAuthToken(testToken);

    // Check axios headers
    expect(axios.defaults.headers.common["x-auth-token"]).toBe(testToken);
    expect(axios.defaults.headers.post["Content-Type"]).toBe(
      "application/json"
    );

    // Verify localStorage wasn't called
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(localStorage.removeItem).not.toHaveBeenCalled();
  });

  it("should remove auth header and clear localStorage when token is null", () => {
    // First set a token
    axios.defaults.headers.common["x-auth-token"] = "existing.token";
    localStorage.setItem("token", "existing.token");

    setAuthToken(null);

    // Check axios headers
    expect(axios.defaults.headers.common["x-auth-token"]).toBeUndefined();
    expect(axios.defaults.headers.post["Content-Type"]).toBeUndefined();

    // Verify localStorage was cleared
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });

  it("should handle undefined/null token without errors", () => {
    expect(() => {
      setAuthToken(null);
      setAuthToken(undefined as unknown as null); // Force bad type for test
    }).not.toThrow();
  });

  it("should not modify other axios headers when setting token", () => {
    // Set some existing headers
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.post["Custom-Header"] = "value";

    setAuthToken("new.token");

    // Check auth header was set
    expect(axios.defaults.headers.common["x-auth-token"]).toBe("new.token");

    // Verify other headers remain unchanged
    expect(axios.defaults.headers.common["Accept"]).toBe("application/json");
    expect(axios.defaults.headers.post["Custom-Header"]).toBe("value");
  });

  it("should not modify other axios headers when removing token", () => {
    // Set some existing headers
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.post["Custom-Header"] = "value";
    axios.defaults.headers.common["x-auth-token"] = "old.token";

    setAuthToken(null);

    // Check auth header was removed
    expect(axios.defaults.headers.common["x-auth-token"]).toBeUndefined();

    // Verify other headers remain unchanged
    expect(axios.defaults.headers.common["Accept"]).toBe("application/json");
    expect(axios.defaults.headers.post["Custom-Header"]).toBe("value");
  });
});
