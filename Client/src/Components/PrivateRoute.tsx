import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../Context/Authentication/AuthContext";
import Spinner from "./Spinner";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  const { state } = React.useContext(AuthContext);
  const { user: User, loading } = state;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        loading ? (
          <Spinner />
        ) : User ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/Auth",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export const AdminRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const { state } = React.useContext(AuthContext);
  const { user: User, loading } = state;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        loading ? (
          <Spinner />
        ) : User ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/Auth",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
