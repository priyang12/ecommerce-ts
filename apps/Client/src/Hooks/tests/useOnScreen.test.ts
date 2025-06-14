import { renderHook } from "@testing-library/react-hooks";
import { useOnScreen } from "../useOnScreen";

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

beforeAll(() => {
  // Replace the native IntersectionObserver with our mock
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("useOnScreen", () => {
  it("should return false initially", () => {
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useOnScreen(ref));

    expect(result.current.isIntersecting).toBe(false);
  });

  it("should create an IntersectionObserver instance", () => {
    const ref = { current: document.createElement("div") };
    renderHook(() => useOnScreen(ref));

    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it("should observe the ref element", () => {
    const observeMock = jest.fn();
    mockIntersectionObserver.mockReturnValueOnce({
      observe: observeMock,
      unobserve: () => null,
      disconnect: () => null,
    });

    const ref = { current: document.createElement("div") };
    renderHook(() => useOnScreen(ref));

    expect(observeMock).toHaveBeenCalledWith(ref.current);
  });

  it("should clean up by disconnecting the observer", () => {
    const disconnectMock = jest.fn();
    mockIntersectionObserver.mockReturnValueOnce({
      observe: () => null,
      unobserve: () => null,
      disconnect: disconnectMock,
    });

    const ref = { current: document.createElement("div") };
    const { unmount } = renderHook(() => useOnScreen(ref));
    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });

  it("should update isIntersecting when intersection occurs", () => {
    let callback: (entries: any) => void = () => {};
    const observeMock = jest.fn();
    const mockEntry = { isIntersecting: true };

    mockIntersectionObserver.mockImplementation((cb) => {
      callback = cb;
      return {
        observe: observeMock,
        unobserve: () => null,
        disconnect: () => null,
      };
    });

    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useOnScreen(ref));

    // Simulate intersection
    callback([mockEntry]);

    expect(result.current.isIntersecting).toBe(true);
  });
});
