import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./Context/Authentication/AuthContext";
import Spinner from "./Components/Spinner";

/**
 * PrivateOutlet Component
 *
 * A protected route wrapper that restricts access to authenticated users only.
 * If the user is not logged in, it redirects them to the login page, preserving the original location for redirection after authentication.
 *
 *
 * ## Usage
 * - Wrap this component around route groups that require authentication.
 * - Part of the route configuration for private routes in the app.
 *
 * ## Behavior
 * - Checks user authentication status via `useAuth` (AuthContext)
 * - Shows loading spinner while auth state is being resolved
 * - If user is authenticated (`user._id` exists), renders child routes via `<Outlet />`
 * - If unauthenticated, redirects to `/auth/login` with a `redirectTo` query param
 *
 * ## Redirection
 * - Captures current `pathname` and `search` query using `useLocation`
 * - Encodes full path as `redirectTo` query for post-login navigation
 *
 */
function PrivateOutlet() {
  const { pathname, search } = useLocation();
  const redirectTo = encodeURI(pathname + search);
  const { state } = useAuth();
  const { user: User, loading } = state;

  if (loading) return <Spinner />;
  return User?._id ? (
    <Outlet />
  ) : (
    <Navigate to={`/auth/login?redirectTo=${redirectTo}`} replace />
  );
}

export default PrivateOutlet;
