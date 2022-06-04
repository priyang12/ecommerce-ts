import { ReactNode, FC } from "react";
import { Alert, AlertContainer } from "./StyledComponents/AlertDisplayStyled";

const AlertDisplay: FC<{
  msg: string;
  type: boolean;
  children?: ReactNode;
}> = ({ msg, type, children }) => {
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
      <Alert theme={theme}>{msg}</Alert>
      {children}
    </AlertContainer>
  );
};

export default AlertDisplay;
