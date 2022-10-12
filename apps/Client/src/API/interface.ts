import { AxiosError } from "axios";
import { DetailedProduct, Product, User } from "../interfaces";

export interface ProductAPI {
  products: Product[];
  page: number;
  pages: number;
}

export interface AdminProductAPI {
  products: DetailedProduct[];
  page: number;
  pages: number;
}

export interface AdminProductMutationAPI {
  msg: string;
}

export type SingleProductAPI = DetailedProduct

export type SearchProductAPI = Product

export type LoadUsersAPI = User

export interface RemoveUSerAPI {
  message: string;
}

export type CustomAxiosError = AxiosError<{
  msg: string;
}>;
