import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { StyledAuthPage, Waves } from "./StyledAuth";
import { StopLoading } from "../../Context/Authentication/AuthActions";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Auth() {
  const { pathname } = useLocation();

  const { state, dispatch } = useContext(AuthContext);
  const { loading, err, token } = state;

  useEffect(() => {
    StopLoading(dispatch);
  }, [dispatch]);

  if (token) return <Navigate to="/" />;

  if (loading) return <Spinner />;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* <Waves>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#a2d9ff"
            fillOpacity="1"
            d="M0,96L21.8,85.3C43.6,75,87,53,131,69.3C174.5,85,218,139,262,170.7C305.5,203,349,213,393,197.3C436.4,181,480,139,524,106.7C567.3,75,611,53,655,64C698.2,75,742,117,785,165.3C829.1,213,873,267,916,282.7C960,299,1004,277,1047,261.3C1090.9,245,1135,235,1178,202.7C1221.8,171,1265,117,1309,133.3C1352.7,149,1396,235,1418,277.3L1440,320L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
          ></path>
        </svg>
      </Waves> */}
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
    </div>
  );
}

export default Auth;
