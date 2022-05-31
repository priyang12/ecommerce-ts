import { Link } from "react-router-dom";
import { StyledResetPasswordPage } from "./StyledNotFoundPage";

interface Props {
  data: {
    heading: string;
    message: string;
    link: string;
  };
}
function ResetPassword({ data }: Props) {
  return (
    <StyledResetPasswordPage>
      <h1>{data.heading}</h1>
      <p>{data.message}</p>

      <p>
        <Link to="/">{data.link}</Link>
      </p>
    </StyledResetPasswordPage>
  );
}

ResetPassword.defaultProps = {
  data: {
    heading: "404 Not Found",
    message: "The page you are looking for does not exist.",
    link: "Go to the home page",
  },
};

export default ResetPassword;
