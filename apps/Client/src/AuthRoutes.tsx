import React from "react";
import { Route, Routes } from "react-router-dom";
import AddressPage from "./Pages/AddressPage";
import Cart from "./Pages/Cart";
import OrderDetails from "./Pages/OrderDetails";
import OrderStatus from "./Pages/OrderStatus";
import PaymentMethod from "./Pages/PaymentMethod";
// import Paypal from "./Pages/PayPal";
import PlaceOrder from "./Pages/PlaceOrder";
import Profile from "./Pages/Profile";
import Wishlist from "./Pages/WishList";

function AuthContainer({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AuthRoutes() {
  return (
    <AuthContainer>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/OrderStatus" element={<OrderStatus />} />
        <Route path="/OrderStatus/:id" element={<OrderDetails />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/payment" element={<PaymentMethod />} />
        {/* <Route path="/PayPal" element={<Paypal />} /> */}
      </Routes>
    </AuthContainer>
  );
}

export default AuthRoutes;
