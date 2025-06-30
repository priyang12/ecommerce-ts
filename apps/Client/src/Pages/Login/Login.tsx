import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "../../Hooks/useForm";
import { LoginUser } from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { LoginSchema } from "../../validation";
import {
  FormControl,
  Input,
  Label,
  SubmitButton,
} from "../../Components/UI/FormControl";
import { styled } from "@linaria/react";

const LoginContainer = styled.section`
  margin-top: 10%;
`;

/**
 * Login Page Component
 *
 * Renders the login form and handles user authentication logic.
 * Utilizes form validation via Zod, custom `useForm` hook for form state management,
 * and `AuthContext` for dispatching login actions.
 *
 *
 * ## Route
 * - `/auth/login`
 *
 * ## Form State
 * - Controlled form inputs managed by `useForm` custom hook.
 * - Validation schema: `LoginSchema` (Zod)
 * - Error handling: Field-level errors displayed per input
 *
 * ## UI Features
 * - Custom styled inputs and labels using `FormControl` components.
 * - Dynamic error highlighting for form fields.
 * - Helmet integration for SEO-friendly page metadata.
 */
const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const {
    state: User,
    ChangeState,
    ErrorsState: FormErrors,
    setErrors,
  } = useForm({
    email: "",
    password: "",
  });
  const { email, password } = User;

  const login = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      LoginUser(LoginSchema.parse({ email, password }), dispatch);
    } catch (error: any) {
      setErrors(error.flatten().fieldErrors);
    }
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="
        Login to your account"
        />
      </Helmet>
      <LoginContainer>
        <form onSubmit={login}>
          <FormControl>
            <Input
              type="text"
              name="email"
              aria-label="email"
              id="email"
              value={email}
              className={FormErrors.email ? "error-input" : ""}
              onChange={ChangeState}
              required
            />
            <span className="bar"></span>
            <Label htmlFor="email">
              {FormErrors.email ? (
                <span className="error">{FormErrors.email}</span>
              ) : (
                "Email"
              )}
            </Label>
          </FormControl>
          <FormControl>
            <Input
              type="password"
              name="password"
              aria-label="password"
              id="password"
              className={FormErrors.password ? "error-input" : ""}
              value={password}
              onChange={ChangeState}
              required
            />
            <span className="bar"></span>
            <Label htmlFor="password">
              {FormErrors.password ? (
                <span className="error">{FormErrors.password}</span>
              ) : (
                "Password"
              )}
            </Label>
          </FormControl>
          <SubmitButton type="submit" value="login" />
        </form>
        <div className="help">
          <Link to="/Auth/ForgotPassword">Forget Password /</Link>
          <br />
          <Link to="/StillWorking"> Need Help</Link>
        </div>
      </LoginContainer>
    </>
  );
};

export default Login;
