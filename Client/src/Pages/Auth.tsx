import { useContext } from 'react';
import Login from '../Components/Login';
import Register from '../Components/Register';
import { useToggle } from '../Utils/CustomHooks';
import { AuthContext } from '../Context/AuthContext';
import { StyledAuthPage } from './StyledPages/StyledAuth';
import { Redirect } from 'react-router';

const Auth = () => {
  const [Toggle, toggleValues] = useToggle(true);
  const { state } = useContext(AuthContext);
  const { loading, err, token } = state;

  if (token) {
    return <Redirect to='/' />;
  }
  return (
    <StyledAuthPage>
      {loading ? (
        <div className='loading' data-testid='Loading'>
          Loading
        </div>
      ) : (
        <div className='container'>
          {err && <div className='err'>{err}</div>}
          <div className='title'>
            <div className={Toggle ? 'Link-border' : ''}>
              <h1 onClick={toggleValues}>Login</h1>
            </div>
            <div className={!Toggle ? 'Link-border' : ''}>
              <h1 onClick={toggleValues}>Register</h1>
            </div>
          </div>
          {Toggle ? <Login /> : <Register />}
        </div>
      )}
    </StyledAuthPage>
  );
};

export default Auth;
