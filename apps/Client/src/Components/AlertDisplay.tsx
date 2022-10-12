import { ReactNode, FC } from "react";
import { CustomAxiosError } from "../API/interface";
import { Alert, AlertContainer } from "./StyledComponents/AlertDisplayStyled";

type AlertDisplayProps = {
  msg?: string;
  AxiosErrorState?: CustomAxiosError;
  type?: boolean;
  children?: ReactNode;
};

const AlertDisplay: FC<AlertDisplayProps> = ({
  AxiosErrorState,
  msg,
  type,
  children,
}) => {
  const theme = {
    alertTextColor: type ? "#00b500" : "#eacece",
    bg: type ? "#afdbaf" : "#ef251b",
    radius: "10px",
  };
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
