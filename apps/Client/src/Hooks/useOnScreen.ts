import { useEffect, useState } from "react";

/**
 * Custom hook to detect if an element is visible on screen
 * @param {React.RefObject} ref - Reference to the element to observe
 * @param {string} rootMargin - Margin around the root (viewport)
 * @returns {Object} - Contains isIntersecting boolean
 */
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
