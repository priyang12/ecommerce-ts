import { FC } from "react";
import { Alert, AlertContainer } from "./StyledComponents/AlertDisplayStyled";

const AlertDisplay: FC<{ msg: string; type: boolean }> = ({ msg, type }) => {
  const theme = {
    alertTextColor: type ? "#00b500" : "#eacece",
    bg: type ? "#afdbaf" : "#ef251b",
    radius: "0px",
  };
  return (
    <AlertContainer
      theme={{
        position: "sticky",
        show: true,
      }}
    >
      <Alert theme={theme}>{msg}</Alert>
    </AlertContainer>
  );
};

export default AlertDisplay;
