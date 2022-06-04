import { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "./Context/Authentication/AuthContext";
import { loadUser } from "./Context/Authentication/AuthActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import AddressPage from "./Pages/AddressPage";
import PaymentMethod from "./Pages/PaymentMethod";
import PlaceOrder from "./Pages/PlaceOrder";
import Paypal from "./Pages/PayPal";
import OrderStatus from "./Pages/OrderStatus";
import Profile from "./Pages/Profile";
import OrderDetails from "./Pages/OrderDetails";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminProducts from "./Pages/AdminProducts";
import AdminUsers from "./Pages/AdminUsers";
import StillWorking from "./Pages/StillWorking";
import AdminUpdateProduct from "./Pages/AdminUpdateProduct";

// Route for Admin and User
import PrivateRoute, { AdminRoute } from "./Components/PrivateRoute";
import { LOG_OUT } from "./Context/Authentication/Authtypes";
import setAuthToken from "./Utils/setAuthToken";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import NotFound from "./Pages/NotFound";

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

  //Set user token in Axios
  if (token) setAuthToken(token);

  const DefaultContainer = () => (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/search/name=:keyword" component={Search} />
      <Route
        exact
        path="/search/name=:keyword/:pageNumber"
        component={Search}
      />
      <Route exact path="/product/:id" component={SingleProduct} />
      <PrivateRoute exact path="/cart" component={Cart} />
      <PrivateRoute exact path="/PlaceOrder" component={PlaceOrder} />
      <PrivateRoute exact path="/OrderStatus" component={OrderStatus} />
      <PrivateRoute exact path="/OrderStatus/:id" component={OrderDetails} />
      <PrivateRoute exact path="/Profile" component={Profile} />
      <AdminRoute exact path="/AdminDashboard" component={AdminDashboard} />
      <AdminRoute exact path="/AdminOrders" component={OrderStatus} />
      <AdminRoute exact path="/AdminProducts" component={AdminProducts} />
      <AdminRoute
        exact
        path="/AdminProducts/:id"
        component={AdminUpdateProduct}
      />
      <AdminRoute exact path="/AdminUsers" component={AdminUsers} />
      {/* <Route component={NotFound} /> */}
      <Footer />
    </Fragment>
  );

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/Auth" component={Auth} />
        <PrivateRoute exact path="/address" component={AddressPage} />
        <PrivateRoute exact path="/payment" component={PaymentMethod} />
        <PrivateRoute exact path="/PayPal" component={Paypal} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route exact path="/ResetPassword/:id" component={ResetPassword} />
        <Route exact path="/StillWorking" component={StillWorking} />
        <Route component={DefaultContainer} />
      </Switch>
    </Router>
  );
}

export default App;
