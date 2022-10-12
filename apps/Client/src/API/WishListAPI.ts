import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../query";

const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const LoadWishListQuery = () => {
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

export const AddWishlistQuery = (setAlert: any) => {
  const { data, isLoading, mutate } = useMutation(
    async (id: string) => {
      return await axios.patch(`/api/wishlist/${id}`);
    },
    {
      onSuccess: (res: any) => {
        setAlert({
          msg: res?.data.msg || "Added to wishlist",
          type: true,
        });
        queryClient.invalidateQueries(["wishList"]);
      },
      onError: (error: any) => {
        setAlert({
          msg: error.data.msg,
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

export const RemoveWishlistQuery = (): any => {
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
          return oldData.products.filter((item: any) => item._id !== id);
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
