import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { Product } from "../interfaces";
import { queryClient } from "../query";
import {
  AdminProductAPI,
  LoadUsersAPI,
  AdminProductMutationAPI,
  RemoveUSerAPI,
  CustomAxiosError,
} from "./interface";

export const useLoadUsers = () => {
  return useQuery<LoadUsersAPI[], CustomAxiosError>("Users", async () => {
    const response: AxiosResponse<LoadUsersAPI[]> = await axios.get(
      "/api/users/admin/all"
    );
    return response.data;
  });
};

export const useRemoveUser = () => {
  return useMutation("RemoveUser", async (id: string) => {
    const response: AxiosResponse<RemoveUSerAPI> = await axios.delete(
      `/api/users/admin/${id}`
    );
    return response.data;
  });
};

export const useAddProduct = () => {
  return useMutation(
    "AddProduct",
    async (product: Product) => {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const response: AxiosResponse<AdminProductMutationAPI> = await axios.post(
        "/api/products/add",
        product,
        config
      );
      return response.data;
    },
    { useErrorBoundary: true }
  );
};

export const useDetailProducts = () => {
  return useQuery<AdminProductAPI, CustomAxiosError>("products", async () => {
    const response: AxiosResponse<AdminProductAPI> = await axios.get(
      "/api/products/all"
    );
    return response.data;
  });
};

export const useEditProduct = (setAlert: any) => {
  return useMutation(
    "EditProduct",
    async (product: any) => {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const id = product.get("id");
      const response: AxiosResponse<AdminProductMutationAPI> = await axios.put(
        `/api/products/product/${id}`,
        product,
        config
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        setAlert({ msg: data.msg, type: true });
        queryClient.invalidateQueries(["products"]);
      },
      onError: (err: any) => {
        setAlert(err.data.msg);
      },
    }
  );
};

export const useDeleteProduct = (setAlert: any) => {
  return useMutation(
    "DeleteProduct",
    async (id: string) => {
      const response: AxiosResponse<AdminProductMutationAPI> =
        await axios.delete(`/api/products/product/${id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setAlert({ msg: data.msg, type: true });
        queryClient.invalidateQueries(["products"]);
      },
      onSettled: (data) => {
        setTimeout(() => {
          setAlert({ msg: "", type: false });
        }, 3000);
      },
      onError: (err: any) => {
        setAlert(err.data.msg);
      },
    }
  );
};

export const DeleteProductCall = async (id: any) => {
  try {
    const response = await axios.delete(`/api/products/product/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
