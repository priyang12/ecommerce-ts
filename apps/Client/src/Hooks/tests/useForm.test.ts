import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../useForm";

describe("useForm", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useForm({ username: "", email: "" }));

    expect(result.current.state).toEqual({ username: "", email: "" });
    expect(result.current.ErrorsState).toEqual({});
  });

  it("should update state on ChangeState", () => {
    const { result } = renderHook(() => useForm({ username: "" }));

    act(() => {
      result.current.ChangeState({
        target: { name: "username", value: "testuser" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.state.username).toBe("testuser");
  });

  it("should set error when field is empty", () => {
    const { result } = renderHook(() => useForm({ username: "" }));

    act(() => {
      result.current.ChangeState({
        target: { name: "username", value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.ErrorsState.username).toBe("USERNAME is required");
  });

  it("should clear error when field has value", () => {
    const { result } = renderHook(() => useForm({ username: "" }));

    act(() => {
      result.current.ChangeState({
        target: { name: "username", value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.ErrorsState.username).toBeNull();
  });

  it("should update state with SetState", () => {
    const { result } = renderHook(() => useForm({ username: "" }));

    act(() => {
      result.current.SetState({ username: "newvalue" });
    });

    expect(result.current.state.username).toBe("newvalue");
  });

  it("should set errors with setErrors", () => {
    const { result } = renderHook(() => useForm({ username: "" }));

    act(() => {
      result.current.setErrors({ username: "Custom error" });
    });

    expect(result.current.ErrorsState.username).toBe("Custom error");
  });
});
