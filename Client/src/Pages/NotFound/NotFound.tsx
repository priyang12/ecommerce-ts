import { Link } from "react-router-dom";
import { StyledPage } from "./StyledNotFoundPage";

interface Props {
  data: {
    heading: string;
    message: string;
    link: string;
  };
}
function NotFound({ data }: Props) {
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

NotFound.defaultProps = {
  data: {
    heading: "404 Not Found",
    message: "The page you are looking for does not exist.",
    link: "Go to the home page",
  },
};

export default NotFound;
