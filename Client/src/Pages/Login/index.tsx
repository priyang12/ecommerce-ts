import React, { useContext } from "react";
import { UserValidation } from "@ecommerce/validation";
import { StyledContainer } from "../../Components/StyledComponents/Container";
import { useForm } from "../../Utils/CustomHooks";
import { LoginUser } from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FormControl, Input, Label } from "../../StyledComponents/FormControl";

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
      LoginUser(
        UserValidation.LoginSchema.parse({ email, password }),
        dispatch
      );
    } catch (error: any) {
      setErrors(error.flatten().fieldErrors);
    }
  };
  return (
    <StyledContainer>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={login}>
        <FormControl>
          <Input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <Label htmlFor="email">
            {FormErrors.email ? (
              <span className="error">{FormErrors.email}</span>
            ) : (
              "email"
            )}
          </Label>
        </FormControl>
        <FormControl>
          <Input
            type="password"
            name="password"
            id="password"
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
        <Input type="submit" value="login" className="btn" />
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
