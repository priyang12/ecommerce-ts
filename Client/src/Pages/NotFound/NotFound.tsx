import { Link } from "react-router-dom";
import { StyledResetPasswordPage } from "./StyledNotFoundPage";

function ResetPassword() {
  return (
    <StyledResetPasswordPage>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </StyledResetPasswordPage>
  );
}

export default ResetPassword;
