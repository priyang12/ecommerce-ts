import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../Context/AuthActions';
import { AuthContext } from '../Context/AuthContext';
import { useToggle, useForm } from '../Utils/CustomHooks';
import { ConfirmPassword, ValidateEmail } from '../Utils/Validation';
import { StyledContainer } from './StyledComponents/Container';

const init = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

const Register = () => {
  const { dispatch } = useContext(AuthContext);

  const [User, ChangeState] = useForm(init);
  const { name, email, password, password2 } = User;

  const [nameValidation, toggleName] = useToggle(false);
  const [emailValidation, toggleEmail] = useToggle(false);
  const [PasswordValidation, togglePass] = useToggle(false);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validate = true;
    if (!ValidateEmail(email)) {
      toggleEmail();
      validate = false;
    }
    if (!ConfirmPassword(password, password2)) {
      togglePass();
      validate = false;
    }
    if (name === '') toggleName();
    if (validate) {
      RegisterUser(User, dispatch);
    }
  };
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
            {nameValidation ? 'Name Should 5-10 Letters' : 'Name'}
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
            {!emailValidation ? ' Email' : 'Enter a Valid Email'}
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
          <label htmlFor='password'> Password</label>
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
            {!PasswordValidation
              ? 'Confirm Password'
              : 'Passwords Does not Match'}
          </label>
        </div>
        <input type='submit' className='btn' value='Register' />
      </form>
      <div className='help'>
        <span>Already have a Account/</span>
        <Link to='#'> Login here</Link>
        <br />
        <Link to='#'> Need Help</Link>
      </div>
    </StyledContainer>
  );
};

export default Register;
