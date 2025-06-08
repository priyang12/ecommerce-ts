import {
  CartSchema,
  OrderSchema,
  ProductsSchema,
  ReviewSchema,
  UserSchema,
  z,
} from "./validation";

export type User = z.infer<typeof UserSchema>;

// Generate Types from
type pickProductSchema = {
  _id: true;
  name: true;
  price: true;
  description: true;
  image: true;
  rating: true;
  numReviews: true;
};

export type Product = z.infer<
  ReturnType<typeof ProductsSchema.pick<pickProductSchema>>
>;

export type DetailedProduct = z.infer<typeof ProductsSchema>;

export type ListProduct = Pick<
  DetailedProduct,
  "_id" | "countInStock" | "name" | "price" | "image"
>;

export type Review = z.infer<typeof ReviewSchema>;

export type IOrder = z.infer<typeof OrderSchema>;

export type Address = IOrder["shippingAddress"];

export type Cart = z.infer<typeof CartSchema>;

export type CartProducts = Cart["products"][0];

export type OrderItems = Pick<CartProducts, "product" | "qty" | "_id">;

export interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isDelivered: boolean;
}
