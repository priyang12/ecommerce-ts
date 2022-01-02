import { FC } from "react";
import { Alert } from "./StyledComponents/AlertDisplayStyled";

const AlertDisplay: FC<{ msg: string; type: boolean }> = ({ msg, type }) => {
  const theme = {
    alertTextColor: type ? "#00b500" : "#ddadad",
    bg: type ? "#afdbaf" : "#ef251b",
  };
  return <Alert theme={theme}>{msg}</Alert>;
};

export default AlertDisplay;
