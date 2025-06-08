import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../Utils/query";
import { toast } from "react-toastify";
import { DetailedProduct } from "../Types/interfaces";

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

export const useLoadWishListQuery = () => {
  return useQuery("wishList", async () => {
    const { data }: AxiosResponse<wishlist> = await axios.get("api/wishlist");
    return data;
  });
};

export const useFilterWishlist = (sort: string, perPage = 5) => {
  return useQuery(
    "wishList",
    async () => {
      const { data }: AxiosResponse<wishlist> = await axios.get(
        "api/wishlist",
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

export const useAddWishlistQuery = () => {
  const Query = useMutation(
    async (id: string) => {
      return await axios.patch(`/api/wishlist/${id}`);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res.data.msg, {
          autoClose: 2000,
        });
        queryClient.invalidateQueries(["wishList"]);
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

export const useRemoveWishlistQuery = (): any => {
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation(
    "removeWishlist",
    async (id: string) => {
      const response = await axios.delete(`/api/wishlist/${id}`);
      return response.data;
    },
    {
      onMutate: async (id: string) => {
        await queryClient.cancelQueries("wishList");
        const snapshotOfPreviousWishlist = queryClient.getQueryData("wishList");

        queryClient.setQueryData("wishList", (oldData: any) => {
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
          "wishList",
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
