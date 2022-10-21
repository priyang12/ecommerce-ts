import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/Authentication/AuthContext";
import AuthRoutes from "./AuthRoutes";
import Spinner from "./Components/Spinner";

function PrivateOutlet() {
  const { state } = useAuth();
  const { user: User, loading } = state;
  if (loading) return <Spinner />;
  return User ? <AuthRoutes /> : <Navigate to="/" />;
}

export default PrivateOutlet;
