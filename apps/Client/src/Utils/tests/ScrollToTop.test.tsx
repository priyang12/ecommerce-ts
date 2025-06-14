import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { useLocation, MemoryRouter } from "react-router-dom";
import ScrollToTop from "../ScrollToTop"; // adjust the import path as needed
import type { Mock } from "vitest";

// Mock react-router-dom's useLocation
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

// Mock window.scrollTo
const scrollToMock = vi.fn();
window.scrollTo = scrollToMock;

describe("ScrollToTop", () => {
  beforeEach(() => {
    scrollToMock.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should scroll to top when pathname changes", () => {
    // Mock initial location

    (useLocation as Mock).mockReturnValue({ pathname: "/initial" });

    const { rerender } = render(
      <MemoryRouter initialEntries={["/initial"]}>
        <ScrollToTop />
      </MemoryRouter>
    );

    // Verify initial scroll
    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);

    // Change pathname
    (useLocation as Mock).mockReturnValue({ pathname: "/new-path" });
    rerender(
      <MemoryRouter initialEntries={["/new-path"]}>
        <ScrollToTop />
      </MemoryRouter>
    );

    // Verify scroll after pathname change
    expect(scrollToMock).toHaveBeenCalledTimes(2);
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it("should not scroll when pathname remains the same", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/same-path" });

    const { rerender } = render(
      <MemoryRouter initialEntries={["/same-path"]}>
        <ScrollToTop />
      </MemoryRouter>
    );

    // Initial scroll
    expect(scrollToMock).toHaveBeenCalledTimes(1);

    // Rerender with same pathname
    rerender(
      <MemoryRouter initialEntries={["/same-path"]}>
        <ScrollToTop />
      </MemoryRouter>
    );

    // Should not scroll again
    expect(scrollToMock).toHaveBeenCalledTimes(1);
  });

  it("should return null and not render any DOM elements", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/" });

    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });
});
