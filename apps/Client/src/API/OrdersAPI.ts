import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../query";
import { OrderListItem } from "./interface";

export const useLoadOrders = (url: string) => {
  return useQuery("orders", async () => {
    const { data }: AxiosResponse<OrderListItem[]> = await axios.get(url);
    return data;
  });
};

export const useOrderDetails = (id: string) => {
  return useQuery(
    `orderDetails/${id}`,
    async () => {
      const response = await axios.get(`/api/orders/order/${id}`);
      return response.data;
    },
    {
      onError: (err: any) => {
        throw Error(err.message);
      },
    }
  );
};

export const useMakeOrder = () => {
  return useMutation(
    "makeOrder",
    async (order: any) => {
      const response = await axios.post("/api/orders", order);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
      },
      onError(err: any) {
        throw Error(err.message);
      },
      useErrorBoundary(error) {
        return error.response?.status >= 500;
      },
    }
  );
};
