import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/Authentication/AuthContext";
import { loadUser } from "./Context/Authentication/AuthActions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import SingleProduct from "./Pages/SingleProduct";
import StillWorking from "./Pages/StillWorking";
import PrivateRoute from "./PrivateRoute";
import setAuthToken from "./Utils/setAuthToken";
import Footer from "./Components/Footer";
import ScrollToTop from "./ScrollToTop";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AlertDisplay from "./Components/AlertDisplay";
import NotFound from "./Pages/NotFound";
import { LOG_OUT } from "./Context/Authentication/Authtypes";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  const { state, dispatch } = useContext(AuthContext);
  const { token, user } = state;
  useEffect(() => {
    if (token) {
      if (user) {
        setAuthToken(token);
      } else {
        loadUser(token, dispatch);
      }
    } else {
      dispatch({
        type: LOG_OUT,
        payload: null,
      });
    }
  }, [token, dispatch, user]);

  if (token) setAuthToken(token);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {!window.navigator.onLine && (
        <AlertDisplay msg="Offline" type={"error"} />
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/search/name=:keyword" element={<Search />} />
        <Route path="/search/name=:keyword/:pageNumber" element={<Search />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/Auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword/:id" element={<ResetPassword />} />
        <Route path="/StillWorking" element={<StillWorking />} />
        <Route path="*" element={<PrivateRoute />} />
        <Route element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
