import axios from "axios";
import { useMutation } from "react-query";
import { queryClient } from "../query";

export const LoadCartQuery = async () => {
  try {
    const response = await axios.get("/api/cart");
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const AddToCartQuery = async (data: { id: string; qty: number }) => {
  try {
    const response = await axios.post("/api/cart", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const AddOrUpdateCartQuery = (setAlert: any) => {
  const { mutate, isLoading, isSuccess } = useMutation(
    async (data: { id: string; qty: number }) => {
      return await axios.post("/api/cart", data);
    },
    {
      onSuccess: (res: any) => {
        setAlert({ msg: res.data.msg, type: true });
        queryClient.invalidateQueries(["Cart"]);
      },
      onSettled: () => {
        setTimeout(() => {
          setAlert({ msg: "", type: false });
        }, 3000);
      },
      onError: (err: any) => {
        setAlert({
          msg: err.response.data.msg,
          type: false,
        });
      },
    }
  );
  return {
    mutate,
    isLoading,
    isSuccess,
  };
};

export const DeleteCartApi = (setAlert: any) => {
  const { data, isLoading, mutate } = useMutation(
    (id: string) => {
      return axios.delete(`/api/cart/${id}`);
    },
    {
      onSuccess: (res: any) => {
        setAlert({
          msg: res.data.msg,
          type: true,
        });
        queryClient.invalidateQueries(["Cart"]);
      },
      onSettled: () => {
        setTimeout(() => {
          setAlert({ msg: "", type: false });
        }, 3000);
      },
      onError: (err: any) => {
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
