import { z } from "zod";
import * as UserValidation from "./Validators/UserValidation";
import * as CartValidation from "./Validators/CartValidation";
import * as ProductValidation from "./Validators/ProductValidation";
import * as WishlistValidation from "./Validators/WishlistValidation";
import * as OrderValidation from "./Validators/OrderValidation";

export {
  z,
  UserValidation,
  CartValidation,
  ProductValidation,
  WishlistValidation,
  OrderValidation,
};

// Need to refactor
// import { z } from "zod";
// export * from "./Validators/UserValidation";
// export * from "./Validators/CartValidation";
// export * from "./Validators/ProductValidation";
// export * from "./Validators/WishlistValidation";
// export * from "./Validators/OrderValidation";
// export { z };
