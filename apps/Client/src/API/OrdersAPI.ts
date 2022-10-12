import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../query";

export const LoadOrders = async (url: any) => {
  try {
    const response = await axios.get(url.queryKey[0]);
    return response.data;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const useOrderDetails = (id: any) => {
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

export const useOrderDelivered = () => {
  return useMutation(
    "OrderDelivered",
    async (id: string) => {
      const response = await axios.put(`/api/orders/order/${id}`);
      return response.data;
    },
    {
      onSuccess: (data, id) => {
        queryClient.invalidateQueries([`orderDetails/${id}`]);
      },
    }
  );
};
