import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { StyledAuthPage } from "./StyledAuth";
import { stopLoading } from "../../Context/Authentication/AuthActions";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router-dom";
import Wave from "react-wavify";

function Auth() {
  const { pathname } = useLocation();

  const { state, dispatch } = useContext(AuthContext);
  const { loading, err, token } = state;

  useEffect(() => {
    stopLoading(dispatch);
  }, [dispatch]);

  if (token) return <Navigate to="/" />;

  if (loading) return <Spinner />;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <StyledAuthPage>
        <Helmet>
          <title>Authentication</title>
        </Helmet>
        <div className="container">
          {err && <div className="alert">{err}</div>}
          <div className="title">
            <div className={pathname.includes("login") ? "Link-border" : ""}>
              <Link to="login" data-testid="login">
                <h1>Login</h1>
              </Link>
            </div>
            <div className={pathname.includes("register") ? "Link-border" : ""}>
              <Link to="register" data-testid="register">
                <h1>Register</h1>
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      </StyledAuthPage>
      <Wave
        style={{
          position: "absolute",
          bottom: "-10px",
          left: 0,
        }}
        fill="#a2d9ff"
        paused={false}
        options={{
          height: 40,
          amplitude: 50,
          speed: 0.5,
          points: 2,
        }}
      />
      <Wave
        style={{
          position: "absolute",
          bottom: "-10px",
          left: 0,
        }}
        fill="#a2d8ffc1"
        paused={false}
        options={{
          height: 40,
          amplitude: 30,
          speed: 0.5,
          points: 2,
        }}
      />
      <Wave
        style={{
          position: "absolute",
          bottom: "-10px",
          left: 0,
        }}
        fill="#717ffac1"
        paused={false}
        options={{
          height: 40,
          amplitude: 30,
          speed: 0.5,
          points: 2,
        }}
      />
    </div>
  );
}

export default Auth;
