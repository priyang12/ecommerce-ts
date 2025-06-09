import { CartSchema, z } from "../validation";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { CartItem } from "../Pages/PlaceOrder/ProductList";
import { queryClient } from "../Utils/query";
import { CustomAxiosError } from "../Constants/interface";
import { API_ENDPOINTS } from "../Constants/apiendpoints";
import { QUERY_KEYS } from "../Constants/queryKeys";

type CartResponse = z.infer<typeof CartSchema> & {
  products: CartItem[];
};

/**
 * hook style function which return `useQuery` called for fetching the User Cart data.
 *
 * @returns {UseQueryResult<CartResponse, CustomAxiosError>} The React Query result object.
 * @example
 * const { data, isLoading, isError } = useLoadCartQuery();
 */
export const useLoadCartQuery = () => {
  return useQuery<CartResponse, CustomAxiosError>(
    QUERY_KEYS.CART,
    async () => {
      const response: AxiosResponse<CartResponse> = await axios.get(
        API_ENDPOINTS.CART
      );
      return response.data;
    },
    {
      useErrorBoundary: (error: any) => error.response?.status >= 500,
      onError(err) {
        if (err.isAxiosError) {
          toast.error(err.response?.data.msg);
        }
      },
    }
  );
};

/**
 * Custom hook to post (add/update) a product in the user's cart.
 * Uses React Query's `useMutation` to perform a POST request to `/api/cart`.
 *
 * Automatically invalidates the cart query to keep the UI in sync using `queryClient.invalidateQueries`.
 *
 * @returns {UseMutationResult<AxiosResponse, AxiosError, { ProductId?: string; qty: number }>} A mutation object with methods and state.
 *
 * @example
 * const { mutate, isLoading } = usePostCartQuery();
 * mutate({ ProductId: "123", qty: 2 });
 */
export const usePostCartQuery = () => {
  const PostToCart = useMutation(
    async (data: { ProductId?: string; qty: number }) => {
      return await axios.post(API_ENDPOINTS.CART, data);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res.data.msg, {
          autoClose: 3000,
          closeButton: true,
        });
        queryClient.invalidateQueries(QUERY_KEYS.CART);
      },
      onError: (err: any) => {
        toast.error(err.response.data.msg, {
          autoClose: 3000,
          closeButton: true,
        });
      },
      useErrorBoundary: (error: any) => error.response?.status >= 500,
    }
  );

  return PostToCart;
};

/**
 * Custom hook to delete a product from the cart using React Query's `useMutation`.
 *
 * Implements optimistic updates for better UX — immediately updates the cache,
 * and rolls back on error.
 *
 * @param {Function} setAlert - A setter function to update alert state. Called with `{ msg: string, type: boolean }`.
 *
 * @returns {{
 *   mutate: (id: string) => void,
 *   data: AxiosResponse | undefined,
 *   isLoading: boolean
 * }} An object containing the mutate function, mutation result data, and loading state.
 *
 * @example
 * const { mutate, isLoading } = useDeleteCartApi(setAlert);
 * mutate("productId123");
 */
export const useDeleteCartApi = (
  setAlert: React.Dispatch<
    React.SetStateAction<{
      msg: string;
      type: boolean;
    }>
  >
) => {
  const { data, isLoading, mutate } = useMutation(
    (id: string) => {
      return axios.delete(API_ENDPOINTS.CART_ITEM(id));
    },

    {
      onMutate: async (id: string) => {
        await queryClient.cancelQueries(QUERY_KEYS.CART);

        const snapshotOfPreviousCart = queryClient.getQueryData(
          QUERY_KEYS.CART
        );

        queryClient.setQueryData(QUERY_KEYS.CART, (oldData: any) => {
          const data = oldData.products.filter(
            (item: CartItem) => item.product._id !== id
          );
          return { ...oldData, products: data };
        });

        return {
          snapshotOfPreviousCart,
        };
      },
      onSuccess: (res: any) => {
        setAlert({
          msg: res.data.msg,
          type: true,
        });
      },

      onError: (err: any, id, context) => {
        queryClient.setQueryData(
          QUERY_KEYS.CART,
          context?.snapshotOfPreviousCart
        );
        setAlert({
          msg: err.response.data.msg,
          type: false,
        });
      },
    }
  );

  return {
    mutate,
    data,
    isLoading,
  };
};
