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

export const AddWishlistQuery = async (id: string) => {
  try {
    const response = await axios.patch(`/api/wishlist/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const RemoveWishlistQuery = (): any => {
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation(
    "removeWishlist",
    async (id: string) => {
      try {
        const response = await axios.delete(`/api/wishlist/${id}`);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["wishList"]);
      },
      onError: () => {
        queryClient.invalidateQueries(["wishList"]);
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
