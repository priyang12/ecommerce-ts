import { BrowserRouter } from "react-router-dom";
import { useOnlineStatus } from "./Hooks/useOnlineStatus";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Utils/ScrollToTop";
import AlertDisplay from "./Components/AlertDisplay";
import Routes from "./Routes";
import Carousel from "./Components/Carousel";

function App() {
  const isOnline = useOnlineStatus();

  return (
    <BrowserRouter>
      <ScrollToTop />
      {!isOnline && (
        <AlertDisplay msg="Offline connect to internet!" type="error" />
      )}
      <Carousel />

      {/* <Navbar /> */}
      {/* <Routes /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
