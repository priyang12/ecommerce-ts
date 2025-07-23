import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IOrder } from "../Types/interfaces";
import { queryClient } from "../Utils/query";
import { OrderListItem } from "../Constants/interface";
import { QUERY_KEYS } from "../Constants/queryKeys";
import { API_ENDPOINTS } from "../Constants/apiendpoints";

const { ORDERS } = QUERY_KEYS;

/**
 * Custom hook to fetch all user orders.
 *
 * @returns {UseQueryResult<OrderListItem[], Error>} React Query's query result object.
 */
export const useLoadOrders = () => {
  return useQuery(
    ORDERS,
    async () => {
      const response: AxiosResponse<OrderListItem[]> = await axios.get(
        API_ENDPOINTS.ORDERS
      );
      return response.data;
    },
    {
      useErrorBoundary: true,
    }
  );
};

/**
 * Custom hook to fetch detailed information for a specific order by ID.
 *
 * @param {string} id - The ID of the order to retrieve.
 * @returns {UseQueryResult<IOrder, Error>} React Query's query result object.
 *
 */
export const useOrderDetails = (id: string) => {
  return useQuery(
    QUERY_KEYS.ORDER_DETAILS(id),
    async () => {
      const response: AxiosResponse<IOrder> = await axios.get(
        API_ENDPOINTS.ORDER_DETAILS(id)
      );
      return response.data;
    },
    {
      useErrorBoundary: true,
    }
  );
};

/**
 * Custom hook to submit a new order.
 *
 * Uses `useMutation` to post order data to the API.
 * On success, it invalidates the `ORDERS` query to refresh the order list.
 *
 * @returns {UseMutationResult<any, Error, any>} React Query mutation result object.
 */
export const useMakeOrder = () => {
  return useMutation(
    QUERY_KEYS.MAKE_ORDER,
    async (order: any) => {
      const response = await axios.post("/api/orders", order);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ORDERS);
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
