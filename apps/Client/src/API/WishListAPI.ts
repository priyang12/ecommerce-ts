import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../Utils/query";
import { toast } from "react-toastify";
import { DetailedProduct } from "../Types/interfaces";
import { QUERY_KEYS } from "../Constants/queryKeys";
import { API_ENDPOINTS } from "../Constants/apiendpoints";

type wishlist = {
  products: Pick<
    DetailedProduct,
    | "_id"
    | "name"
    | "price"
    | "image"
    | "description"
    | "createdAt"
    | "countInStock"
  >[];
  user: string;
  _id: string;
  createdAt: string;
};

/**
 * Fetches the user's wishlist.
 *
 * @returns React Query result containing the wishlist.
 */
export const useLoadWishListQuery = () => {
  return useQuery(QUERY_KEYS.WISHLIST, async () => {
    const { data }: AxiosResponse<wishlist> = await axios.get(
      API_ENDPOINTS.WISHLIST
    );
    return data;
  });
};

/**
 * Fetches the user's wishlist with optional sorting and pagination.
 *
 * @param sort - Sorting parameter (e.g., "price", "date")
 * @param perPage - Number of items per page (default: 5)
 * @returns React Query result containing the filtered wishlist.
 */
export const useFilterWishlist = (sort: string, perPage = 5) => {
  return useQuery(
    QUERY_KEYS.WISHLIST,
    async () => {
      const { data }: AxiosResponse<wishlist> = await axios.get(
        API_ENDPOINTS.WISHLIST,
        {
          params: {
            perPage,
            sort,
          },
        }
      );
      return data;
    },
    {
      useErrorBoundary: (error: any) => error.response?.status >= 500,
      onError(err) {
        if (err.isAxiosError) {
          toast.error(err.response?.data.msg);
        } else {
          throw err;
        }
      },
    }
  );
};

/**
 * Adds a product to the user's wishlist.
 *
 * @returns Mutation result for the add wishlist action.
 */
export const useAddWishlistQuery = () => {
  const Query = useMutation(
    async (productId: string) => {
      return await axios.patch(`${API_ENDPOINTS.WISHLIST}/${productId}`);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res.data.msg, {
          autoClose: 2000,
        });
        queryClient.invalidateQueries(QUERY_KEYS.WISHLIST);
      },
      onError: (error: unknown) => {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const { response } = error as {
            response: { data: { msg: string } };
          };
          toast.error(response.data.msg, {
            autoClose: 2000,
          });
        } else {
          toast.error("Something went wrong", {
            autoClose: 2000,
          });
        }
      },
    }
  );
  return Query;
};

/**
 * Removes a product from the user's wishlist with optimistic update.
 *
 * @returns Mutation result and related states.
 */
export const useRemoveWishlistQuery = (): any => {
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation(
    "removeWishlist",
    async (id: string) => {
      const response = await axios.delete(`${API_ENDPOINTS.WISHLIST}/${id}`);
      return response.data;
    },
    {
      onMutate: async (id: string) => {
        await queryClient.cancelQueries(QUERY_KEYS.WISHLIST);
        const snapshotOfPreviousWishlist = queryClient.getQueryData(
          QUERY_KEYS.WISHLIST
        );

        queryClient.setQueryData(QUERY_KEYS.WISHLIST, (oldData: any) => {
          return {
            ...oldData,
            products: oldData.products.filter((item: any) => item._id !== id),
          };
        });

        return {
          snapshotOfPreviousWishlist,
        };
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          QUERY_KEYS.WISHLIST,
          context?.snapshotOfPreviousWishlist
        );
      },
    }
  );

  return {
    mutate,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  };
};
