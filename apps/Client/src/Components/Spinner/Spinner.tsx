import Img from "../../Assets/loading.gif";
import { StyledSpinner } from "./StyledSpinner";

interface SpinnerProps {}

/**
 * A loading spinner component that displays an animated GIF.
 *
 * @example
 * <Spinner />
 *
 * @description
 * This component displays a loading indicator using a GIF animation.
 * It's typically used to indicate asynchronous operations or content loading states.
 *
 * The component includes:
 * - A container with test ID "Loading" for testing purposes
 * - An accessible image with alt text "Loading Please Wait"
 *
 * @requires ../../Assets/loading.gif - The loading animation image
 *
 */
function Spinner({}: SpinnerProps) {
  return (
    <StyledSpinner data-testid="Loading">
      <img src={Img} alt="Loading Please Wait" />
    </StyledSpinner>
  );
}

export default Spinner;
