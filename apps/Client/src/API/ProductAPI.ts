import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { DetailedProduct } from "../Types/interfaces";
import {
  CustomAxiosError,
  ProductAPI,
  SearchProductAPI,
} from "../Constants/interface";
import { API_ENDPOINTS } from "../Constants/apiendpoints";
import { QUERY_KEYS } from "../Constants/queryKeys";

/**
 * Fetches all products with selected fields.
 *
 * @returns {UseQueryResult<ProductAPI, CustomAxiosError>} The query result for products.
 */
export const useProducts = () => {
  return useQuery<ProductAPI, CustomAxiosError>(
    QUERY_KEYS.PRODUCTS,
    async () => {
      const response: AxiosResponse<ProductAPI> = await axios.get(
        API_ENDPOINTS.PRODUCTS,
        {
          params: {
            select: "_id,name,image,price,rating,numReviews",
          },
        }
      );
      return response.data;
    },
    {
      useErrorBoundary: (error: any) => error.response?.status >= 500,
    }
  );
};

/**
 * Fetches a list of suggested products based on a filter.
 *
 * @param {string} filter - Keyword to filter products.
 * @param {number} [perPage=6] - Number of products to fetch.
 * @returns {UseQueryResult<ProductAPI, CustomAxiosError>} The query result for suggested products.
 */
export const useSuggestProduct = (filter: string, perPage = 6) => {
  return useQuery<ProductAPI, CustomAxiosError>(
    `suggested?filter=${filter}&perPage=${perPage}`,
    async () => {
      const response: AxiosResponse<ProductAPI> = await axios.get(
        API_ENDPOINTS.PRODUCTS,
        {
          params: {
            perPage: perPage,
            sort: "rating",
            filter,
          },
        }
      );

      return response.data;
    },
    {
      useErrorBoundary: true,
    }
  );
};

/**
 * Fetches a single product's detailed information.
 *
 * @param {string} id - The product ID.
 * @param {boolean} [Type] - If true, disables the query.
 * @returns {UseQueryResult<DetailedProduct, CustomAxiosError>} The query result for a single product.
 */
export const useSingleProduct = (id: string, Type?: boolean) => {
  return useQuery<DetailedProduct, CustomAxiosError>(
    ["product", id],
    async () => {
      const response: AxiosResponse<DetailedProduct> = await axios.get(
        API_ENDPOINTS.SINGLE_PRODUCT(id)
      );
      return response.data;
    },
    {
      enabled: !Type,
    }
  );
};

/**
 * Searches for products by keyword.
 *
 * @param {string} search - The search term.
 * @returns {UseQueryResult<ProductAPI, CustomAxiosError>} The query result for the searched products.
 */
export const useSearchProduct = (search: string) => {
  return useQuery<ProductAPI, CustomAxiosError>(
    ["search", search],
    async () => {
      const response: AxiosResponse<ProductAPI> = await axios.get(
        API_ENDPOINTS.SEARCH(search)
      );
      return response.data;
    }
  );
};

/**
 * Loads the top-rated products.
 *
 * @returns {UseQueryResult<SearchProductAPI[], CustomAxiosError>} The query result for top products.
 */
export const useLoadTopProducts = () => {
  return useQuery<SearchProductAPI[], CustomAxiosError>(
    QUERY_KEYS.TOP_PRODUCTS,
    async () => {
      const response: AxiosResponse<SearchProductAPI[]> = await axios.get(
        API_ENDPOINTS.TOP_PRODUCTS
      );
      return response.data;
    },
    {
      suspense: true,
      useErrorBoundary: (error: any) => error.response?.status >= 500,
    }
  );
};
