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

export interface SingleProductAPI extends DetailedProduct {}

export interface SearchProductAPI extends Product {}

export interface LoadUsersAPI extends User {}

export interface RemoveUSerAPI {
  message: string;
}

export type CustomAxiosError = AxiosError<{
  msg: string;
}>;
