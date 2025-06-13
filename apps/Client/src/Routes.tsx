import { Outlet, Route, Routes as RouterRoutes } from "react-router-dom";
import { CheckoutProvider } from "./Context/CheckoutContext/CheckoutContext";
import { StyledCheckoutContainer } from "./Components/UI/CheckoutContainer";
import { StyledCheckoutLayout } from "./Components/UI/CheckoutContainer/CheckoutContainer";
import Auth from "./Pages/Auth";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import SingleProduct from "./Pages/SingleProduct";
import StillWorking from "./Pages/StillWorking";
import PrivateRoute from "./PrivateRoute";
import AddressPage from "./Pages/AddressPage";
import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound";
import OrderDetails from "./Pages/OrderDetails";
import OrderStatus from "./Pages/OrderStatus";
import PaymentMethod from "./Pages/PaymentMethod";
import PayPal from "./Pages/PayPal";
import PlaceOrder from "./Pages/PlaceOrder";
import Profile from "./Pages/Profile";
import Reviews from "./Pages/Reviews";
import Wishlist from "./Pages/WishList";
import Navigators from "./Components/Navigators";

function Checkout() {
  return (
    <CheckoutProvider>
      <StyledCheckoutLayout>
        <StyledCheckoutContainer style={{ maxWidth: "50vw" }}>
          <Navigators />
        </StyledCheckoutContainer>
        <Outlet />
      </StyledCheckoutLayout>
    </CheckoutProvider>
  );
}

const Routes = () => {
  return (
    <>
      <RouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/search/:keyword/:pageNumber" element={<Search />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/Auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />}>
            <Route path="address" element={<AddressPage />} />
            <Route path="paymentMethod" element={<PaymentMethod />} />
            <Route path="placeOrder" element={<PlaceOrder />} />
            <Route path="paypal" element={<PayPal />} />
          </Route>

          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/OrderStatus" element={<OrderStatus />} />
          <Route path="/OrderStatus/:id" element={<OrderDetails />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
        <Route path="/StillWorking" element={<StillWorking />} />
      </RouterRoutes>
    </>
  );
};

export default Routes;
