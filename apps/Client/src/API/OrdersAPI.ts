import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IOrder } from "../interfaces";
import { queryClient } from "../query";
import { OrderListItem } from "./interface";

export const useLoadOrders = (url: string) => {
  return useQuery(
    "orders",
    async () => {
      const { data }: AxiosResponse<OrderListItem[]> = await axios.get(url);
      return data;
    },
    {
      useErrorBoundary: true,
    }
  );
};

export const useOrderDetails = (id: string) => {
  return useQuery(
    `orderDetails/${id}`,
    async () => {
      const response: AxiosResponse<IOrder> = await axios.get(
        `/api/orders/order/${id}`
      );
      return response.data;
    },
    {
      useErrorBoundary: true,
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
