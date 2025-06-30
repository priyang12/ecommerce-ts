import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../Utils/query";
import type { CustomAxiosError, UserReviews } from "../Constants/interface";
import type { IOrder, Review } from "../Types/interfaces";
import { API_ENDPOINTS } from "../Constants/apiendpoints";
import { QUERY_KEYS } from "../Constants/queryKeys";

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

/**
 * Hook to submit a product review for an order.
 *
 * Optimistically marks the product as reviewed in the order details cache,
 * and invalidates the product's review list on success.
 *
 * @returns Mutation result object from React Query.
 *
 * @example
 * const { mutate } = usePostReview();
 * mutate({ OrderID: "order123", ProductID: "prod456", review: { rating: 5, comment: "Great!" } });
 */
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
      }> = await axios.post(API_ENDPOINTS.POST_REVIEW, data.review, {
        params: {
          OrderID: data.OrderID,
          ProductId: data.ProductID,
        },
      });
      return res.data;
    },
    {
      async onMutate({ OrderID, ProductID }) {
        await queryClient.cancelQueries("Cart");
        const snapshotOfPreviousCart = queryClient.getQueryData(
          QUERY_KEYS.ORDER_DETAILS(OrderID)
        );

        queryClient.setQueryData(
          QUERY_KEYS.ORDER_DETAILS(OrderID),
          (oldData: any) => {
            const { orderItems }: Pick<IOrder, "orderItems"> = oldData;
            const NewLists = orderItems.map((item) => {
              if (item.product._id === ProductID) {
                item.Reviewed = true;
              }
              return item;
            });
            return { ...oldData, orderItems: NewLists };
          }
        );
        return {
          snapshotOfPreviousCart,
        };
      },
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

/**
 * Hook to fetch reviews for a single product by its ID.
 *
 * @param id - Product ID
 * @returns {UseQueryResult<Review[], CustomAxiosError>}
 *
 */
export const useProductReviews = (id: string | undefined) => {
  return useQuery<Review[], CustomAxiosError>(
    ["reviews", id],
    async () => {
      const response: AxiosResponse<Review[]> = await axios.get(
        API_ENDPOINTS.PRODUCT_REVIEWS(id!)
      );
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
};

/**
 * Hook to fetch all reviews made by the logged-in user,
 * including selected product and order details.
 *
 * @returns {UseQueryResult<UserReviews[], CustomAxiosError>}
 *
 * @example
 * const { data: myReviews } = useUserReviews();
 */
export const useUserReviews = () => {
  return useQuery<Review[], CustomAxiosError>(
    "UserReview",
    async () => {
      const { data }: AxiosResponse<UserReviews[]> = await axios.get(
        // this just wrong on so many level god know what was i thinking!!
        // refactor this
        `/api/reviews?productSelect=name,price,image,brand,numReviews&orderSelect=itemsPrice,totalPrice,paymentMethod,deliveredAt,createdAt`
      );
      return data;
    },
    {
      useErrorBoundary: true,
    }
  );
};
