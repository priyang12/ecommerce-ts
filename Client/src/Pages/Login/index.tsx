import React, { useContext } from "react";
import { StyledContainer } from "../../Components/StyledComponents/Container";
import { useForm } from "../../Utils/CustomHooks";
import { LoginUser } from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { ValidateEmail, ValidatePassword } from "../../Utils/Validation";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  /* eslint-disable */
  const [User, ChangeState, setState, FormErrors, setErrors] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = User;

  const login = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validate = true;
    let Errors = {
      email: "",
      password: "",
    };
    if (!ValidateEmail(email)) {
      Errors.email = "Email is not Valid";
      validate = false;
    }
    if (!ValidatePassword(password)) {
      Errors.password = "Password Should be more than 6 Characters";
      validate = false;
    }
    if (validate) {
      LoginUser(User, dispatch);
    } else {
      setErrors(Errors);
    }
  };
  return (
    <StyledContainer>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={login}>
        <div className="form-control">
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <label htmlFor="email">
            {FormErrors.email ? (
              <span className="error">{FormErrors.email}</span>
            ) : (
              "email"
            )}
          </label>
        </div>
        <div className="form-control">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <label htmlFor="password">
            {FormErrors.email ? (
              <span className="error">{FormErrors.password}</span>
            ) : (
              "Password"
            )}
          </label>
        </div>
        <input type="submit" value="login" className="btn" />
      </form>
      <div className="help">
        <Link to="/ForgotPassword">Forget Password /</Link>
        <br />
        <Link to="/StillWorking"> Need Help</Link>
      </div>
    </StyledContainer>
  );
};

export default Login;
