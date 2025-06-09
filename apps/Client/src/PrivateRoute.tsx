import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./Context/Authentication/AuthContext";
import Spinner from "./Components/Spinner";

function PrivateOutlet() {
  const { pathname, search } = useLocation();
  const redirectTo = encodeURI(pathname + search);
  const { state } = useAuth();
  const { user: User, loading } = state;

  if (loading) return <Spinner />;
  return User?._id ? (
    <Outlet />
  ) : (
    <Navigate to={`/auth/login?redirectTo=${redirectTo}`} replace />
  );
}

export default PrivateOutlet;
