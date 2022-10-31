import React from "react";
import { Route, Routes } from "react-router-dom";
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

function AuthContainer({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AuthRoutes() {
  return (
    <AuthContainer>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/OrderStatus" element={<OrderStatus />} />
        <Route path="/OrderStatus/:id" element={<OrderDetails />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/paymentMethod" element={<PaymentMethod />} />
        <Route path="/PayPal" element={<PayPal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContainer>
  );
}

export default AuthRoutes;
