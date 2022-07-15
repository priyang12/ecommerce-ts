import { CartValidation } from "@ecommerce/validation";
import axios from "axios";
import { useMutation } from "react-query";
import { CartItem } from "../Components/ProductList";
import { queryClient } from "../query";

export const LoadCartQuery = async () => {
  try {
    const response = await axios.get("/api/cart");
    return CartValidation.CartSchema.parse(response.data);
  } catch (error: any) {
    return error.response;
  }
};

export const AddOrUpdateCartQuery = (setAlert: any) => {
  const { mutate, isLoading, isSuccess } = useMutation(
    async (data: { ProductId: string; qty: number }) => {
      return await axios.post("/api/cart", data);
    },
    {
      onSuccess: (res: any) => {
        setAlert({ msg: res.data.msg, type: true });
        queryClient.invalidateQueries("Cart");
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
      onMutate: async (id: string) => {
        await queryClient.cancelQueries("Cart");

        const snapshotOfPreviousCart = queryClient.getQueryData("Cart");

        queryClient.setQueryData("Cart", (oldData: any) => {
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
        queryClient.setQueryData("Cart", context?.snapshotOfPreviousCart);
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
