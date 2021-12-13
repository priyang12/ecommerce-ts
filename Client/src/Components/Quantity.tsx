import { FC, Fragment } from "react";

const Quantity: FC<{ countInStock: number }> = ({ countInStock }) => {
  return (
    <Fragment>
      {Array.from(Array(countInStock).keys()).map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>
      ))}
    </Fragment>
  );
};

export default Quantity;
