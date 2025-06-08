import { ReactNode, FC } from "react";
import { CustomAxiosError } from "../API/interface";
import { Alert, AlertContainer } from "./StyledComponents/AlertDisplayStyled";

type AlertDisplayProps = {
  msg: string;
  AxiosErrorState?: CustomAxiosError;
  type?: "success" | "error" | "warning" | "info";
  children?: ReactNode;
};

const TypeCss = (type: string) => {
  switch (type) {
    case "success":
      return {
        bg: "#afdbaf",
        alertTextColor: "#fff",
      };
    case "error":
      return {
        bg: "#ef251b",
        alertTextColor: "#fff",
      };
    case "warning":
      return {
        bg: "#ff9800",
        alertTextColor: "#fff",
      };
    case "info":
      return {
        bg: "#2196f3",
        alertTextColor: "#fff",
      };
    default:
      return {
        bg: "#2196f3",
        alertTextColor: "#fff",
      };
  }
};

const AlertDisplay: FC<AlertDisplayProps> = ({
  AxiosErrorState,
  msg,
  type = "success",
  children,
}) => {
  const { bg, alertTextColor } = TypeCss(type);

  const theme = {
    bg,
    alertTextColor,
    radius: "10px",
  };
  // if (!alertState) return null;
  return (
    <AlertContainer
      theme={{
        position: "sticky",
        show: true,
      }}
    >
      {AxiosErrorState ? (
        <Alert theme={theme}>
          <p>{AxiosErrorState.response?.data.msg}</p>
        </Alert>
      ) : (
        <Alert theme={theme}>{msg}</Alert>
      )}

      {children}
    </AlertContainer>
  );
};

export default AlertDisplay;
