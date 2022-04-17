import { useEffect, useRef, useState } from "react";

export const useForm = (
  initialState: any
): [
  any,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (NewState: any) => void,
  any,
  (ErrorState: any) => void
] => {
  const [state, setState] = useState(initialState);
  const [ErrorsState, setErrorsState] = useState(initialState);
  const SetState = (NewState: unknown) => {
    setState(NewState);
  };
  const ChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "")
      setErrorsState({
        ...ErrorsState,
        [name]: `${name.toUpperCase()} is required`,
      });
    else setErrorsState({ ...ErrorsState, [name]: null });

    setState({ ...state, [name]: value });
  };

  const setErrors = (ErrorState: any) => {
    setErrorsState(ErrorState);
  };
  // Pass Init State
  // Pass Change State for on change event
  // Pass SetErrorState for set error state
  // Pass Set State for set state to null of init

  return [state, ChangeState, SetState, ErrorsState, setErrors];
};

export const useToggle = (
  initialState: boolean
): [boolean, () => void, (value: boolean) => void] => {
  const [Toggle, setToggle] = useState(initialState);
  const toggleState = () => {
    setToggle((state) => !state);
  };
  const ChangeState = (value: boolean) => {
    setToggle(value);
  };
  return [Toggle, toggleState, ChangeState];
};

// useOnScreen Hook
// Usage: Check if element is on screen
export const useOnScreen = (
  ref: React.RefObject<HTMLElement>,
  rootMargin = "0px"
) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);
  return { isIntersecting };
};

export function useTilt(active: any) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state: {
      [key: string]: any;
    } = {
      rect: null,
      mouseX: 0,
      mouseY: 0,
    };

    let el = ref.current as HTMLElement;

    const handleMouseMove = (e: any) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      const px: number = (state.mouseX - state.rect.left) / state.rect.width;
      const py: number = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px.toString());
      el.style.setProperty("--py", py.toString());
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}
