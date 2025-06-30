import { useContext } from "react";
import { Link, Navigate as Redirect } from "react-router-dom";
import { RegisterUser } from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { useForm } from "../../Hooks/useForm";
import { Helmet } from "react-helmet-async";
import {
  FormControl,
  Input,
  Label,
  SubmitButton,
} from "../../Components/UI/FormControl";
import { RegisterSchema, z } from "../../validation";
import Spinner from "../../Components/Spinner";
import { styled } from "@linaria/react";

const StyledRegisterContainer = styled.div`
  margin-top: 10%;
`;

/**
 * Register Page Component
 *
 * Renders the registration form and handles new user sign-up.
 * Incorporates form validation using Zod and manages form state through a custom `useForm` hook.
 * Also uses `AuthContext` for authentication state and dispatching registration logic.
 *
 *
 * ## Route
 * - `/auth/register`
 *
 * ## Form State
 * - Controlled form inputs managed by `useForm`
 * - Validation schema: `RegisterSchema` (Zod)
 * - Fields: `name`, `email`, `password`, `password2` (confirm password)
 * - Error messages shown inline using Zod's `.flatten().fieldErrors`
 *
 * ## UI Features
 * - Custom styled input fields with error highlighting via `FormControl`
 * - Uses `react-helmet-async` to manage page metadata (`<title>`)
 * - Displays a loading spinner when auth state is loading
 * - Redirects to homepage if already authenticated
 */
const Register = () => {
  const { state, dispatch } = useContext(AuthContext);
  const {
    state: User,
    ChangeState,
    ErrorsState: FormErrors,
    setErrors,
  } = useForm({ name: "", email: "", password: "", password2: "" });
  const { name, email, password, password2 } = User;

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      RegisterUser(RegisterSchema.parse(User), dispatch);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = error.flatten();
        setErrors(fieldErrors);
      }
    }
  };

  if (state.token) {
    return <Redirect to="/" />;
  }
  if (state.loading) {
    return <Spinner />;
  }
  return (
    <StyledRegisterContainer>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <form onSubmit={onSubmit}>
        <FormControl>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            className={FormErrors.name ? "error-input" : ""}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <Label htmlFor="name">
            {FormErrors.name ? (
              <span className="error">{FormErrors.name}</span>
            ) : (
              "Username"
            )}
          </Label>
        </FormControl>
        <FormControl>
          <Input
            type="text"
            name="email"
            id="email"
            className={FormErrors.email ? "error-input" : ""}
            value={email}
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
        <FormControl>
          <Input
            type="password"
            name="password2"
            id="password2"
            value={password2}
            className={FormErrors.password2 ? "error-input" : ""}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <Label htmlFor="password2">
            {FormErrors.password2 ? (
              <span className="error">{FormErrors.password2}</span>
            ) : (
              "Confirm password"
            )}
          </Label>
        </FormControl>
        <SubmitButton type="submit" value="Register" />
      </form>
      <div className="help">
        <Link to="/StillWorking"> Need Help</Link>
      </div>
    </StyledRegisterContainer>
  );
};

export default Register;
