import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ProductAPI, SearchProductAPI, SingleProductAPI } from "./interface";

export const useProducts = () => {
  return useQuery<ProductAPI, Error>("products", async () => {
    const response: AxiosResponse<ProductAPI> = await axios.get(
      "/api/products"
    );
    return response.data;
  });
};

export const useSingleProduct = (id: string, Type?: boolean) => {
  return useQuery<SingleProductAPI, Error>(
    ["product", id],
    async () => {
      const response: AxiosResponse<SingleProductAPI> = await axios.get(
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
  return useQuery<ProductAPI, Error>(["search", search], async () => {
    const response: AxiosResponse<ProductAPI> = await axios.get(
      `/api/products/${search}`
    );
    return response.data;
  });
};

export const useLoadTopProducts = () => {
  return useQuery<SearchProductAPI[], Error>("topProducts", async () => {
    const response: AxiosResponse<SearchProductAPI[]> = await axios.get(
      "/api/products/top"
    );
    return response.data;
  });
};
