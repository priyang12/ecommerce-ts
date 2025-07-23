import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import {
  loadUser,
  UpdatePassword,
} from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import { ConfirmPassword, ValidatePassword } from "../../Utils/Validation";
import setAuthToken from "../../Utils/setAuthToken";

import {
  FormControl,
  Input,
  Label,
  SubmitButton,
} from "../../Components/UI/FormControl";
import {
  StyledResetContainer,
  StyledResetPasswordPage,
} from "./StyledResetPasswordPage";

/**
 * Reset Password Page Component
 *
 * Renders the reset password UI for authenticated or verified users via token.
 * Handles secure password reset logic with validation and dispatch to auth context.
 *
 * ## Route
 * - `/auth/reset/:token`
 *
 * ## Token Handling
 * - Extracts token from URL params using `useParams`.
 * - Loads user data via `loadUser` action and sets the token in headers via `setAuthToken`.
 *
 * ## Form State
 * - Controlled inputs for `Password` and `Password2` managed via custom `useForm` hook.
 * - Validation logic:
 *   - `ValidatePassword`: Ensures password length/security.
 *   - `ConfirmPassword`: Ensures both inputs match.
 * - Error state dynamically updated and displayed inline.
 */
function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const { state, dispatch } = useContext(AuthContext);

  const {
    state: UserForm,
    ChangeState,
    SetState,
    ErrorsState: FormErrors,
    setErrors,
  } = useForm({
    Password: "",
    Password2: "",
  });

  const { Password, Password2 } = UserForm;

  useEffect(() => {
    (async () => {
      if (token) {
        await loadUser(token, dispatch);
        setAuthToken(token);
      }
    })();
  }, [token, dispatch]);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validate = true;
    const Errors = {
      password: "",
      password2: "",
    };
    if (!ValidatePassword(Password)) {
      Errors.password = "Password Should be more than 6 Characters";
      validate = false;
    }
    if (!ConfirmPassword(Password, Password2)) {
      Errors.password2 = "Password and Confirm Password do not match";
      validate = false;
    }

    if (validate) {
      UpdatePassword(dispatch, Password, Password2);
      setErrors(Errors);
      SetState({
        Password: "",
        Password2: "",
      });
    } else {
      setErrors(Errors);
    }
  };

  if (state.loading) return <Spinner />;

  return (
    <StyledResetPasswordPage>
      <h1>Reset Password</h1>
      {state.err ? (
        <AlertDisplay msg={state.err} type={"error"}>
          <Link to="/Auth/login"> Go back to Login Page</Link>
        </AlertDisplay>
      ) : null}

      {state.alert ? (
        <div>
          <AlertDisplay msg={state.alert?.message} type={"success"}>
            <Link to="/">Home Page</Link>
          </AlertDisplay>
        </div>
      ) : null}
      {state.user ? (
        <StyledResetContainer>
          <h1>
            Your Name : <span>{state.user.name}</span>
          </h1>
          <p>
            Your Email address : <span>{state.user.email}</span>{" "}
          </p>
          <form onSubmit={onSubmit}>
            <FormControl>
              <Input
                type="password"
                name="Password"
                id="Password"
                className={FormErrors.password ? "error-input" : ""}
                value={Password}
                onChange={ChangeState}
                required
              />
              <span className="bar"></span>
              <Label htmlFor="Password">
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
                name="Password2"
                id="Password2"
                className={FormErrors.password2 ? "error-input" : ""}
                value={Password2}
                onChange={ChangeState}
                required
              />
              <span className="bar"></span>
              <Label htmlFor="Password2">
                {FormErrors.password2 ? (
                  <span className="error">{FormErrors.password2}</span>
                ) : (
                  "Confirm password"
                )}
              </Label>
            </FormControl>
            <SubmitButton type="submit" value="Reset" />
          </form>
        </StyledResetContainer>
      ) : null}
    </StyledResetPasswordPage>
  );
}

export default ResetPassword;
