import { FC } from "react";

const AlertDisplay: FC<{ msg: string; type: boolean }> = ({ msg, type }) => {
  return <div className={type ? "success" : "fail"}>{msg}</div>;
};

export default AlertDisplay;
