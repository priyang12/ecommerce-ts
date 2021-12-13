import { FC } from 'react';

const AlertDisplay: FC<{ msg: string; type: string }> = ({ msg, type }) => {
  return <div className={type}>{msg}</div>;
};

export default AlertDisplay;
