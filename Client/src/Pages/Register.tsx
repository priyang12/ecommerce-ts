import { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { RegisterUser } from "../Context/Authentication/AuthActions";
import { AuthContext } from "../Context/Authentication/AuthContext";
import { useForm } from "../Utils/CustomHooks";
import {
  ConfirmPassword,
  ValidateEmail,
  ValidateName,
  ValidatePassword,
} from "../Utils/Validation";

import { StyledContainer } from "../Components/StyledComponents/Container";
import Spinner from "../Components/Spinner";

const init = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const { state, dispatch } = useContext(AuthContext);
  /* eslint-disable */
  const [User, ChangeState, setState, FormErrors, setErrors] = useForm(init);
  const { name, email, password, password2 } = User;

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validate = true;
    let Errors = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };

    if (!ValidateName(name)) {
      Errors.name = "Name Should be 5-10 Characters";
      validate = false;
    }
    if (!ValidateEmail(email)) {
      Errors.email = "Email is not Valid";
      validate = false;
    }
    if (!ValidatePassword(password)) {
      Errors.password = "Password Should be more than 6 Characters";
      validate = false;
    }
    if (!ConfirmPassword(password, password2)) {
      Errors.password2 = "Passwords Does not Match";
      validate = false;
    }
    if (validate) {
      RegisterUser(User, dispatch);
      setErrors(Errors);
    } else {
      setErrors(Errors);
    }
  };
  if (state.token) {
    return <Redirect to='/' />;
  }
  if (state.loading) {
    return <Spinner />;
  }
  return (
    <StyledContainer>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={ChangeState}
            required
          />
          <span className='bar'></span>
          <label htmlFor='name'>
            {FormErrors.name ? (
              <span className='error'>{FormErrors.name}</span>
            ) : (
              "name"
            )}
          </label>
        </div>
        <div className='form-control'>
          <input
            type='text'
            name='email'
            id='email'
            value={email}
            onChange={ChangeState}
            required
          />
          <span className='bar'></span>
          <label htmlFor='email'>
            {FormErrors.email ? (
              <span className='error'>{FormErrors.email}</span>
            ) : (
              "email"
            )}
          </label>
        </div>
        <div className='form-control'>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={ChangeState}
            required
          />
          <span className='bar'></span>
          <label htmlFor='password'>
            {FormErrors.password ? (
              <span className='error'>{FormErrors.password}</span>
            ) : (
              "password"
            )}
          </label>
        </div>
        <div className='form-control'>
          <input
            type='password'
            name='password2'
            id='password2'
            value={password2}
            onChange={ChangeState}
            required
          />
          <span className='bar'></span>
          <label htmlFor='password2'>
            {FormErrors.password2 ? (
              <span className='error'>{FormErrors.password2}</span>
            ) : (
              "confirm password"
            )}
          </label>
        </div>
        <input type='submit' className='btn' value='Register' />
      </form>
      <div className='help'>
        <Link to='#'> Need Help</Link>
      </div>
    </StyledContainer>
  );
};

export default Register;
