import { renderHook } from "@testing-library/react-hooks";
import { useTilt } from "../useTilt";

describe("useTilt", () => {
  it("should return a ref object", () => {
    const { result } = renderHook(() => useTilt(true));

    expect(result.current).toHaveProperty("current");
  });

  // add more tests with dom later.
});
