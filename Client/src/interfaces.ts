import {
  CartSchema,
  OrderSchema,
  ProductsSchema,
  ReviewSchema,
  UserSchema,
  z,
} from "@ecommerce/validation";

export type User = z.infer<typeof UserSchema>;

// Generate Types from
const ProductSchema = ProductsSchema.pick({
  _id: true,
  name: true,
  price: true,
  description: true,
  image: true,
  rating: true,
  numReviews: true,
});

export type Product = z.infer<typeof ProductSchema>;

export type DetailedProduct = z.infer<typeof ProductsSchema>;

export type ListProduct = Pick<
  DetailedProduct,
  "_id" | "countInStock" | "name" | "price" | "image"
>;

export type Review = z.infer<typeof ReviewSchema>;

export type OrderSchema = z.infer<typeof OrderSchema>;

export type Address = OrderSchema["shippingAddress"];

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
