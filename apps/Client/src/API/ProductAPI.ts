import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { DetailedProduct } from "../interfaces";
import { CustomAxiosError, ProductAPI, SearchProductAPI } from "./interface";

export const useProducts = () => {
  return useQuery<ProductAPI, CustomAxiosError>(
    "products",
    async () => {
      const response: AxiosResponse<ProductAPI> = await axios.get(
        "/api/products"
      );
      return response.data;
    },
    {
      useErrorBoundary: (error: any) => error.response?.status >= 500,
    }
  );
};

export const useSingleProduct = (id: string, Type?: boolean) => {
  return useQuery<DetailedProduct, CustomAxiosError>(
    ["product", id],
    async () => {
      const response: AxiosResponse<DetailedProduct> = await axios.get(
        `/api/products/product/${id}`
      );
      return response.data;
    },
    {
      enabled: !Type,
    }
  );
};

export const useSearchProduct = (search: string) => {
  return useQuery<ProductAPI, CustomAxiosError>(
    ["search", search],
    async () => {
      const response: AxiosResponse<ProductAPI> = await axios.get(
        `/api/products/${search}`
      );
      return response.data;
    }
  );
};

export const useLoadTopProducts = () => {
  return useQuery<SearchProductAPI[], CustomAxiosError>(
    "topProducts",
    async () => {
      const response: AxiosResponse<SearchProductAPI[]> = await axios.get(
        "/api/products/top"
      );
      return response.data;
    },
    {
      useErrorBoundary: (error: any) => error.response?.status >= 500,
    }
  );
};
