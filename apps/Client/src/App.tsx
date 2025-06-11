import { BrowserRouter } from "react-router-dom";
import { useOnlineStatus } from "./Hooks/useOnlineStatus";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Utils/ScrollToTop";
import AlertDisplay from "./Components/AlertDisplay";
import Routes from "./Routes";
import { styled } from "@linaria/react";
import Carousel from "./Components/Carousel";
import Slide from "./Components/Carousel/Slide";
import { Products } from "./Pages/Testdata/Data";
import { useReducer, useState } from "react";

function App() {
  const isOnline = useOnlineStatus();

  const [state, dispatch] = useReducer({} as any, {});
  const [Hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      {!isOnline && (
        <AlertDisplay msg="Offline connect to internet!" type="error" />
      )}
      <Carousel />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "50vw",
        }}
      >
        <Slide
          slide={Products[0]}
          offset={0}
          key={1}
          onMouseEnter={handleHover}
          onFocus={handleHover}
          onMouseLeave={handleLeave}
          dispatch={dispatch}
        />
      </div>
      {/* <Navbar /> */}
      {/* <Routes /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
