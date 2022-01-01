import { Fragment, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./Context/Authentication/AuthContext";
import { loadUser } from "./Context/Authentication/AuthActions";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import AddressPage from "./Pages/AddressPage";
import PaymentMethod from "./Pages/PaymentMethod";
import PlaceOrder from "./Pages/PlaceOrder";
import Paypal from "./Pages/PayPal";
import OrderStatus from "./Pages/OrderStatus";
import setAuthToken from "./Utils/setAuthToken";
import OrderDetails from "./Pages/OrderDetails";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  const { state, dispatch } = useContext(AuthContext);
  const { token, user } = state;
  useEffect(() => {
    if (token) {
      loadUser(token, dispatch);
    }
  }, [token, dispatch]);

  //Set user token in Axios
  if (token && !user) setAuthToken(token);

  const DefaultContainer = () => (
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Home} />
      <Route exact path='/product/:id' component={SingleProduct} />
      <Route exact path='/cart' component={Cart} />
      <Route exact path='/PlaceOrder' component={PlaceOrder} />
      <Route exact path='/OrderStatus' component={OrderStatus} />
      <Route exact path='/OrderStatus/:id' component={OrderDetails} />
      <Route exact path='/AdminDashboard' component={AdminDashboard} />
      <Route exact path='/AdminOrders' component={OrderStatus} />
      <Route exact path='/AdminOrders' component={OrderStatus} />
    </Fragment>
  );

  return (
    <Router>
      <Switch>
        <Route exact path='/Auth' component={Auth} />
        <Route exact path='/address' component={AddressPage} />
        <Route exact path='/payment' component={PaymentMethod} />
        <Route exact path='/PayPal' component={Paypal} />
        <Route component={DefaultContainer} />
      </Switch>
    </Router>
  );
}

export default App;
