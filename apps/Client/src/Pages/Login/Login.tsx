import React, { useContext } from "react";
import { LoginSchema } from "../../validation";
import { useForm } from "../../Utils/CustomHooks";
import { LoginUser } from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FormControl,
  Input,
  Label,
  SubmitButton,
} from "../../StyledComponents/FormControl";

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
      <form onSubmit={login}>
        <FormControl>
          <Input
            type="text"
            name="email"
            aria-label="email"
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
        <SubmitButton type="submit" value="login" className="btn" />
      </form>
      <div className="help">
        <Link to="/Auth/ForgotPassword">Forget Password /</Link>
        <br />
        <Link to="/StillWorking"> Need Help</Link>
      </div>
    </>
  );
};

export default Login;
