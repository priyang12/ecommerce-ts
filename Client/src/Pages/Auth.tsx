import { useContext, useEffect } from "react";
import { useToggle } from "../Utils/CustomHooks";
import { AuthContext } from "../Context/Authentication/AuthContext";
import { StyledAuthPage } from "./StyledPages/StyledAuth";
import { Redirect } from "react-router";
import Login from "./Login";
import Register from "./Register";
import Spinner from "../Components/Spinner";
import { StopLoading } from "../Context/Authentication/AuthActions";

const Auth = () => {
  const [Toggle, toggleValues] = useToggle(true);
  const { state, dispatch } = useContext(AuthContext);
  const { loading, err, token } = state;
  useEffect(() => {
    StopLoading(dispatch);
  }, [dispatch]);

  if (token) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <StyledAuthPage>
      <div className="container">
        {err && <div className="alert">{err}</div>}
        <div className="title">
          <div className={Toggle ? "Link-border" : ""}>
            <h1 onClick={toggleValues}>Login</h1>
          </div>
          <div className={!Toggle ? "Link-border" : ""}>
            <h1 onClick={toggleValues}>Register</h1>
          </div>
        </div>
        {Toggle ? <Login /> : <Register />}
      </div>
    </StyledAuthPage>
  );
};

export default Auth;
