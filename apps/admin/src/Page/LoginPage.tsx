import { Login } from "react-admin";
import HelmetComponent from "../HelmetComponent";

export const MyLoginPage = () => (
  <>
    <HelmetComponent>
      <title>Login Page</title>
      <meta name="description" content="Login Page" />
    </HelmetComponent>
    <Login
      // A random image that changes everyday
      backgroundImage="https://source.unsplash.com/random/1600x900/daily"
    />
  </>
);
