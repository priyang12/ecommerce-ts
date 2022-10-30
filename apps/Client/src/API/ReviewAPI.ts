import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Review } from "../interfaces";
import { queryClient } from "../query";
import { CustomAxiosError } from "./interface";

const ErrorHandle = (error: unknown) => {
  if (typeof error === "object" && error !== null && "response" in error) {
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
};

export const usePostReview = () => {
  return useMutation(
    async (data: {
      OrderID: string;
      ProductID: string;
      review: {
        rating: number;
        comment: string;
      };
    }) => {
      const res: AxiosResponse<{
        msg: string;
      }> = await axios.post(`/api/reviews`, data.review, {
        params: {
          OrderID: data.OrderID,
          ProductId: data.ProductID,
        },
      });
      return res.data;
    },
    {
      onSuccess(data, { ProductID }) {
        toast.success(data.msg, {
          autoClose: 3000,
          closeButton: true,
        });
        queryClient.invalidateQueries(["reviews", ProductID]);
      },
      onError(error) {
        ErrorHandle(error);
      },
    }
  );
};

export const useReviews = (id: string) => {
  return useQuery<Review[], CustomAxiosError>(["review", id], async () => {
    const response: AxiosResponse<Review[]> = await axios.get(
      `/api/reviews/ProductId/${id}`
    );
    return response.data;
  });
};
