import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/Authentication/AuthContext";
import Spinner from "./Components/Spinner";

function PrivateOutlet() {
  const { state } = useAuth();
  const { user: User, loading } = state;
  if (loading) return <Spinner />;
  return User ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default PrivateOutlet;
