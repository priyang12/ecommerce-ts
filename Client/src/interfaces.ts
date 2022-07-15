import {
  z,
  ProductValidation,
  UserValidation,
  OrderValidation,
  CartValidation,
} from "@ecommerce/validation";

const UserSchema = UserValidation.UserSchema;

export type User = z.infer<typeof UserSchema>;

// Generate Types from
const ProductSchema = ProductValidation.ProductsSchema.pick({
  _id: true,
  name: true,
  price: true,
  description: true,
  image: true,
  rating: true,
  numReviews: true,
});

export type Product = z.infer<typeof ProductSchema>;

export type DetailedProduct = z.infer<typeof ProductValidation.ProductsSchema>;

export type ListProduct = Pick<
  DetailedProduct,
  "_id" | "countInStock" | "name" | "price" | "image"
>;

export type Review = z.infer<typeof ProductValidation.ReviewSchema>;

export type OrderSchema = z.infer<typeof OrderValidation.OrderSchema>;

export type Address = OrderSchema["shippingAddress"];

export type Cart = z.infer<typeof CartValidation.CartSchema>;

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
