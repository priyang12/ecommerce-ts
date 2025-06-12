import { BrowserRouter } from "react-router-dom";
import { useOnlineStatus } from "./Hooks/useOnlineStatus";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Utils/ScrollToTop";
import AlertDisplay from "./Components/AlertDisplay";
import Routes from "./Routes";
import Carousel from "./Components/Carousel";
import Select from "./Components/Select";
import Quantity, { StyledQuantityOptions } from "./Components/Select/Quantity";

function App() {
  const isOnline = useOnlineStatus();

  return (
    <BrowserRouter>
      <ScrollToTop />
      {!isOnline && (
        <AlertDisplay msg="Offline connect to internet!" type="error" />
      )}

      <Select>
        <StyledQuantityOptions key={"initial"} value={""}>
          select quantity
        </StyledQuantityOptions>
        <Quantity countInStock={5} />
      </Select>

      {/* <Navbar /> */}
      {/* <Routes /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
