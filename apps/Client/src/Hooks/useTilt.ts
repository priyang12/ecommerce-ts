import { useEffect, useRef } from "react";

/**
 * Custom hook that creates a tilt effect when hovering over an element
 * @param {boolean} active - Whether the tilt effect should be active
 * @returns {React.RefObject} - Ref to attach to the element
 */
export function useTilt(active: boolean) {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    if (!ref.current || !active) return;

    const state = {
      rect: null as DOMRect | null,
      mouseX: 0,
      mouseY: 0,
    };

    const el = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!el) return;

      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }

      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

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
