import { useContext } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import Spinner from "../../Components/Spinner";
import Wave from "react-wavify";
import { headerContainer, StyledAuthPage } from "./StyledAuth";

/**
 * Renders the navigation links for "Login" and "Register" pages.
 * Highlights the active link based on the current URL path.
 *
 * @returns {JSX.Element} The navigation header for authentication pages.
 */
function AuthNavigator({}) {
  const { pathname } = useLocation();
  return (
    <div className={headerContainer}>
      <div className={pathname.includes("login") ? "Link-border" : ""}>
        <Link to="login" data-testid="login">
          <h1>Login</h1>
        </Link>
      </div>
      <div className={pathname.includes("register") ? "Link-border" : ""}>
        <Link to="register" data-testid="register">
          <h1>Register</h1>
        </Link>
      </div>
    </div>
  );
}

/**
 * A reusable animated wave component using react-wavify.
 * Used as a decorative footer element in the authentication layout.
 *
 * @param {object} props - Props passed to the Wave component (e.g., style, fill).
 * @returns {JSX.Element} A styled wave element.
 */
function WaveComponent({ ...props }) {
  return (
    <Wave
      paused={false}
      options={{
        height: 40,
        amplitude: 50,
        speed: 0.5,
        points: 2,
      }}
      {...props}
    />
  );
}

/**
 * Authentication Page Component
 *
 * Main authentication layout component.
 * Handles redirection if the user is already authenticated,
 * shows a loading spinner while verifying auth state,
 * and renders login/register forms via nested routes.
 *
 *
 * ## Route
 * - `/auth/login`
 * - `/auth/register`
 *
 * ## Query Parameters
 * - `redirectTo` (string): Optional. URL to navigate to after successful login.
 *   Defaults to `/` if not specified.
 *
 * ## Context
 * - Uses `AuthContext` to determine the loading state and authentication token.
 *
 * ## UI Features
 * - Displays a tab-like header with navigation between Login and Register.
 * - Includes decorative `wave` elements at the bottom of the screen.
 */

function Auth() {
  const { search } = useLocation();
  const redirectTo = new URLSearchParams(search).get("redirectTo") || "/";

  const {
    state: { loading, token, err },
  } = useContext(AuthContext);

  if (token) return <Navigate to={redirectTo} />;
  if (loading) return <Spinner />;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <StyledAuthPage>
        <Helmet>
          <title>Authentication</title>
        </Helmet>
        <div className="container">
          <AuthNavigator />
          {err ? <div className="alert">{err}</div> : null}
          <Outlet />
        </div>
      </StyledAuthPage>
      <WaveComponent
        style={{
          position: "absolute",
          bottom: "-30px",
          left: 0,
        }}
        fill="var(--primary-800)"
      />
      <WaveComponent
        style={{
          position: "absolute",
          bottom: "-20px",
          left: 0,
        }}
        fill="var(--primary-500)"
      />
      <WaveComponent
        style={{
          position: "absolute",
          bottom: "-5px",
          left: 0,
        }}
        fill="var(--primary-200)"
      />
    </div>
  );
}

export default Auth;
