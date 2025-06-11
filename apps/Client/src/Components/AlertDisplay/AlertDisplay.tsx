import { CustomAxiosError } from "../../Constants/interface";
import {
  StyledAlertDisplay,
  StyledAlertContainer,
  alertSuccess,
  alertError,
  alertInfo,
  alertWarning,
} from "./StyledAlertDisplay";

interface AlertDisplayProps {
  msg: string;
  AxiosErrorState?: CustomAxiosError;
  type?: "success" | "error" | "warning" | "info";
  children?: React.ReactNode;
}

const alertTypeCss = (type: string) => {
  switch (type) {
    case "success":
      return alertSuccess;
    case "error":
      return alertError;
    case "warning":
      return alertWarning;
    case "info":
      return alertInfo;
    default:
      return alertInfo;
  }
};

/**
 * A customizable alert component that displays messages with different styles based on type.
 * Supports custom Axios error responses and child elements.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.msg - The primary message to display.
 * @param {CustomAxiosError} [props.AxiosErrorState] - Optional Axios error object to display error-specific messages.
 * @param {"success" | "error" | "warning" | "info"} [props.type="info"] - Alert type (determines styling).
 * @param {React.ReactNode} [props.children] - Optional child elements to render inside the alert.
 * @returns {JSX.Element} A styled alert container with dynamic content.
 */
function AlertDisplay({
  msg,
  AxiosErrorState,
  type = "info",
  children,
}: AlertDisplayProps) {
  const alertType = alertTypeCss(type);
  const errorMessage = AxiosErrorState?.response?.data.msg
    ? AxiosErrorState?.response?.data.msg
    : msg;
  return (
    <StyledAlertContainer className={alertType} role="alert">
      <StyledAlertDisplay>
        <p>{errorMessage}</p>
      </StyledAlertDisplay>

      {children}
    </StyledAlertContainer>
  );
}

export default AlertDisplay;
