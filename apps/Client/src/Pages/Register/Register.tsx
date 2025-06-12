import { useContext } from "react";
import { Link, Navigate as Redirect } from "react-router-dom";
import { RegisterUser } from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { useForm } from "../../Hooks/useForm";
import { StyledContainer } from "../../Components/StyledComponents/Container";
import { Helmet } from "react-helmet-async";
import {
  FormControl,
  Input,
  Label,
  SubmitButton,
} from "../../Components/UI/FormControl";
import { RegisterSchema } from "../../validation";
import Spinner from "../../Components/Spinner";
const init = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const { state, dispatch } = useContext(AuthContext);
  const {
    state: User,
    ChangeState,
    ErrorsState: FormErrors,
    setErrors,
  } = useForm(init);
  const { name, email, password, password2 } = User;

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      RegisterUser(RegisterSchema.parse(User), dispatch);
    } catch (error: any) {
      setErrors(error.flatten().fieldErrors);
    }
  };
  if (state.token) {
    return <Redirect to="/" />;
  }
  if (state.loading) {
    return <Spinner />;
  }
  return (
    <StyledContainer>
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
        <SubmitButton type="submit" className="btn" value="Register" />
      </form>
      <div className="help">
        <Link to="#"> Need Help</Link>
      </div>
    </StyledContainer>
  );
};

export default Register;
