import React, { useContext } from 'react';
import { StyledContainer } from './StyledComponents/Container';
import { useToggle, useForm } from '../Utils/CustomHooks';
import { LoginUser } from '../Context/AuthActions';
import { AuthContext } from '../Context/AuthContext';
import { EmptyValue, ValidateEmail } from '../Utils/Validation';
import { Link } from 'react-router-dom';

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [User, ChangeState] = useForm({ email: '', password: '' });
  const { email, password } = User;
  // eslint-disable-next-line
  const [emailValidation, toggleEmail, SetEmailCheck] = useToggle(true);

  const login = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let EmailCheck = ValidateEmail(email);
    let EmptyCheck = EmptyValue(User);

    SetEmailCheck(EmailCheck);

    if (EmailCheck || EmptyCheck) {
      LoginUser(User, dispatch);
    }
  };
  return (
    <StyledContainer>
      <form onSubmit={login}>
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
            {emailValidation ? 'Email' : ' Enter a Valid Email Address'}
          </label>
        </div>
        <div className='form-control'>
          <input
            type='password'
            name='password'
            id='Password'
            value={password}
            onChange={ChangeState}
            required
          />
          <span className='bar'></span>
          <label htmlFor='Password'>Password</label>
        </div>
        <input type='submit' value='login' className='btn' />
        {EmptyValue(User) && 'Please Enter All The Fields Properly'}
      </form>
      <div className='help'>
        <Link to='#'>Forget Password /</Link>
        <br />
        <Link to='#'> Need Help</Link>
      </div>
    </StyledContainer>
  );
};

export default Login;
