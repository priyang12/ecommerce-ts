import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import {
  loadUser,
  UpdatePassword,
} from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { useForm } from "../../Utils/CustomHooks";
import setAuthToken from "../../Utils/setAuthToken";
import { ConfirmPassword, ValidatePassword } from "../../Utils/Validation";
import { StyledResetPasswordPage } from "./StyledResetPasswordPage";

function ResetPassword() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useContext(AuthContext);
  const [UserForm, ChangeState, setState, FormErrors, setErrors] = useForm({
    Password: "",
    Password2: "",
  });
  const { Password, Password2 } = UserForm;

  useEffect(() => {
    setAuthToken(id);
  }, []);

  useEffect(() => {
    loadUser(id, dispatch);
  }, [id, dispatch]);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validate = true;
    let Errors = {
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
      UpdatePassword(dispatch, {
        Password,
        Password2,
      });
      setErrors(Errors);
      setState({
        Password: "",
        Password2: "",
      });
    } else {
      setErrors(Errors);
    }
  };
  if (state.loading) return <Spinner />;
  if (state.err)
    return (
      <AlertDisplay msg={state.err} type={false}>
        <Link to="/Auth/login"> Go back to Login Page</Link>
      </AlertDisplay>
    );
  return (
    <StyledResetPasswordPage>
      <h1>Reset Password</h1>
      {state.alert && (
        <div>
          <AlertDisplay msg={state.alert?.message} type={true}>
            <Link to="/">Home Page</Link>
          </AlertDisplay>
        </div>
      )}
      {state.user && (
        <div>
          <h1>{state.user.name}</h1>
          <p>{state.user.email}</p>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <input
                type="password"
                name="Password"
                id="Password"
                value={Password}
                onChange={ChangeState}
                required
              />
              <span className="bar"></span>
              <label htmlFor="Password">
                {FormErrors.password ? (
                  <span className="error">{FormErrors.password}</span>
                ) : (
                  "Password"
                )}
              </label>
            </div>
            <div className="form-control">
              <input
                type="password"
                name="Password2"
                id="Password2"
                value={Password2}
                onChange={ChangeState}
                required
              />
              <span className="bar"></span>
              <label htmlFor="Password2">
                {FormErrors.password2 ? (
                  <span className="error">{FormErrors.password2}</span>
                ) : (
                  "Confirm password"
                )}
              </label>
            </div>
            <input type="submit" className="btn" value="Reset" />
          </form>
        </div>
      )}
    </StyledResetPasswordPage>
  );
}

export default ResetPassword;
