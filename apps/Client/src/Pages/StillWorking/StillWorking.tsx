import { Link } from "react-router-dom";
import { StyledContainer } from "./StyledStillWorking";

/**
 * Still Working Page Component
 *
 * Displays a placeholder message indicating that certain features are under development.
 * Designed as a temporary UX notice for unfinished or in-progress sections of the application.
 *
 * ## Route
 * - Typically used on incomplete feature routes (e.g. `/features/upcoming`)
 *
 * ## Global Theme
 * - Colors utilize `--primary`, `--text`, and `--bg-surface` variables for consistency.
 */
const StillWorking = () => {
  return (
    <main>
      <StyledContainer>
        <h1>Still Working On Features</h1>
        <p>Sorry For Your Inconvenience </p>
        <div className="links">
          <Link to="/">Go to Home</Link>
          <Link to="/auth/login">Login Page</Link>
        </div>
      </StyledContainer>
    </main>
  );
};

export default StillWorking;
