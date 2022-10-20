import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../query";
import { toast } from "react-toastify";

const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const useLoadWishListQuery = () => {
  const [WishList, setWishList] = useState([]);
  const { isFetched, isLoading, data } = useQuery(
    "wishList",
    () => fetchData("/api/wishlist"),

    {
      onSuccess: (data: any) => {
        setWishList(data.products);
      },
    }
  );

  return {
    data,
    WishList,
    isFetched,
    isLoading,
  };
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
