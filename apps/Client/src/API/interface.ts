import { OrderSchema, z } from "../validation";
import { AxiosError } from "axios";
import { DetailedProduct, Product, User } from "../Types/interfaces";

export interface ProductAPI {
  products: Product[];
  page: number;
  pages: number;
}

export type SingleProductAPI = DetailedProduct;

export type SearchProductAPI = Product;

export type LoadUsersAPI = User;

export interface RemoveUSerAPI {
  message: string;
}

export type Order = z.infer<typeof OrderSchema>;

export type OrderListItem = Pick<
  Order,
  "_id" | "paymentMethod" | "totalPrice" | "user" | "isDelivered"
> & {
  user: {
    name: string;
    email: string;
  };
};

export type CustomAxiosError = AxiosError<{
  msg: string;
}>;
