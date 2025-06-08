import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import SingleProduct from "./Pages/SingleProduct";
import StillWorking from "./Pages/StillWorking";
import PrivateRoute from "./PrivateRoute";
import Footer from "./Components/Footer";
import ScrollToTop from "./Utils/ScrollToTop";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AlertDisplay from "./Components/AlertDisplay";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
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
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/search/:keyword/:pageNumber" element={<Search />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/Auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<PrivateRoute />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword/:id" element={<ResetPassword />} />
        <Route path="/StillWorking" element={<StillWorking />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
