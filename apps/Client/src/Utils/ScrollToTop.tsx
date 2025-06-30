import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A component that scrolls the window to the top whenever the route changes.
 *
 * @component
 * @example
 * // Usage in a React application:
 * // Include this component in your app's layout or router configuration
 * function App() {
 *   return (
 *     <>
 *       <ScrollToTop />
 *       <Routes>
 *
 *       </Routes>
 *     </>
 *   );
 * }
 *
 * @returns {null} This component doesn't render anything, it just handles side effects
 */

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
