import { Link } from "react-router-dom";
import { StyledPage } from "./StyledNotFoundPage";

interface Props {
  data?: {
    heading: string;
    message: string;
    link: string;
  };
}

/**
 * NotFound component
 *
 * A reusable error fallback page for invalid or undefined routes (typically 404).
 *
 * Props:
 * - `data`: Optional object to customize the heading, message, and link text.
 *   - `heading` (string): Main title (e.g. "404 Not Found").
 *   - `message` (string): Brief description of the issue.
 *   - `link` (string): Text for the navigation link back to a safe page (usually home).
 *
 * Defaults to a generic 404 message and link to the home route.
 */
function NotFound({
  data = {
    heading: "404 Not Found",
    message: "The page you are looking for does not exist.",
    link: "Go to the home page",
  },
}: Props) {
  return (
    <StyledPage>
      <h1>{data.heading}</h1>
      <p>{data.message}</p>

      <p>
        <Link to="/">{data.link}</Link>
      </p>
    </StyledPage>
  );
}

export default NotFound;
