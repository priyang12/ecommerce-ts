import axios from "axios";
import { useQuery } from "react-query";

export const LoadProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const SingleProductCall = async (id: string) => {
  try {
    const response = await axios.get(`/api/products/product/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const SearchProduct = async (Params: any) => {
  try {
    const response = await axios.get(`/api/products/${Params.queryKey[0]}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const LoadTopProducts: any = () => {
  return useQuery("topProducts", async () => {
    try {
      const response = await axios.get("/api/products/top");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  });
};
