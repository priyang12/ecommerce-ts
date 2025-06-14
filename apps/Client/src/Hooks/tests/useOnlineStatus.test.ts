import { renderHook } from "@testing-library/react-hooks";
import { useOnlineStatus } from "../useOnlineStatus";

describe("useOnlineStatus", () => {
  beforeAll(() => {
    Object.defineProperty(window.navigator, "onLine", {
      value: true,
      writable: true,
    });
  });

  it("should return true when online", () => {
    (window.navigator as any).onLine = true;
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
  });

  it("should return false when offline", () => {
    (window.navigator as any).onLine = false;
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(false);
  });
});
